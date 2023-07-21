// Written By Deepak Rathod 21 May 2023
// While Feeling Exhausted
import React, {Component} from 'react';

//React Native Components
import {
	View,
	StyleSheet,
	ScrollView,
	AppState,
	BackHandler,
} from 'react-native';

//Custom Components
import UtilityHolder from './tabs/UtilityHolder';
import FocusHolder from './tabs/FocusHolder';
import AppHolder from './tabs/AppHolder';
import Sleeping from 'components/Sleeping';

//Themes
import {colors} from 'themes';
//Utils
import DB from 'db';
import helper from 'utils/helper';
import moment from 'moment';
//Libs
import RNInstalledApplication from 'libs/AppManager';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sleepingTime: false,
		};
		this.sleepTimer = null;
	}
	componentDidMount() {
		this.init();
	}

	init = async () => {
		try {
			DB();
			const todayStart = moment().startOf('day').unix() * 1000;
			const todayEnd = moment().endOf('day').unix() * 1000;
			const hasPermission =
				await RNInstalledApplication.hasAppUsagePermission();
			if (!hasPermission) {
				await RNInstalledApplication.getAppUsagePermission();
			}
			await RNInstalledApplication.initUsageStats(todayStart, todayEnd);
			AppState.addEventListener('blur', () => {
				let sleepingTime = this.state.sleepingTime;
				if (sleepingTime) {
					RNInstalledApplication.hideNotificationTray();
					this.sleepTimer = setInterval(() => {
						RNInstalledApplication.hideNotificationTray();
					}, 100);
				}
			});
			AppState.addEventListener('focus', () => {
				clearInterval(this.sleepTimer);
				const beforeTime = moment('23:00', 'HH:mm');
				const afterTime = moment('06:00', 'HH:mm');
				const time = moment();
				let sleepingTime = false;
				if (time.isSameOrAfter(beforeTime) && time.isSameOrBefore(afterTime)) {
					sleepingTime = true;
				}
				this.setState({
					sleepingTime,
				});
				this.focusHolder?.reset();
			});
			BackHandler.addEventListener('hardwareBackPress', () => true);
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		const {navigation} = this.props;
		const {sleepingTime} = this.state;
		return (
			<View style={styles.main}>
				{sleepingTime ? (
					<Sleeping />
				) : (
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						decelerationRate={0.9}
						overScrollMode="never"
						showsScrollIndicator={false}
						disableIntervalMomentum={true}
						snapToInterval={helper.width}>
						<UtilityHolder nav={navigation} />
						<FocusHolder
							ref={ref => (this.focusHolder = ref)}
							nav={navigation}
						/>
						<AppHolder nav={navigation} />
					</ScrollView>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		height: helper.height,
		width: helper.width,
		backgroundColor: colors.background,
	},
});