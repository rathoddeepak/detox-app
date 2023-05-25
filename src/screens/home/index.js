// Written By Deepak Rathod 21 May 2023
// While Feeling Exhausted
import React, {Component} from 'react';

//React Native Components
import {View, StyleSheet, ScrollView} from 'react-native';

//Custom Components
import UtilityHolder from './tabs/UtilityHolder';
import FocusHolder from './tabs/FocusHolder';
import AppHolder from './tabs/AppHolder';

//Themes
import {colors} from 'themes';
//Utils
import FrequentAppDB from 'db/FrequentApps';
import helper from 'utils/helper';
import moment from 'moment';
//Libs
import RNInstalledApplication from 'libs/AppManager';

export default class Home extends Component {
	componentDidMount() {
		this.init();
	}

	init = async () => {
		try {
			FrequentAppDB.init();
			const todayStart = moment().startOf('day').unix() * 1000;
			const todayEnd = moment().endOf('day').unix() * 1000;
			const hasPermission =
				await RNInstalledApplication.hasAppUsagePermission();
			if (!hasPermission) {
				await RNInstalledApplication.getAppUsagePermission();
			}
			await RNInstalledApplication.initUsageStats(todayStart, todayEnd);
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		const {navigation} = this.props;
		return (
			<View style={styles.main}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					decelerationRate={0.9}
					overScrollMode="never"
					showsScrollIndicator={false}
					disableIntervalMomentum={true}
					snapToInterval={helper.width}>
					<UtilityHolder nav={navigation} />
					<FocusHolder nav={navigation} />
					<AppHolder nav={navigation} />
				</ScrollView>
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
