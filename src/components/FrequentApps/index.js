import React, {Component, useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, Image, Modal} from 'react-native';
import {icons, colors, fontFamily, fontSize} from 'themes';
import helper from 'utils/helper';
import AppManager from 'libs/AppManager';
import FrequentAppDB from 'db/FrequentApps';
const size = 40;
const iconSize = size - size * 0.3;

export default class FrequentApps extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appList: [],
			v: false,
		};
	}

	handleClose = () => {
		this.setState({
			v: false,
		});
	};

	loadApps = () => {
		const appList = FrequentAppDB.getAll();
		this.setState({appList, v: true});
	};

	openApp = packageName => {
		this.handleClose();
		AppManager.startAppByPackageName(packageName);
	};

	renderApp = ({appName, packageName}, index) => {
		return (
			<TouchableOpacity
				onPress={() => this.openApp(packageName)}
				style={styles.appCard}
				key={index}>
				<Text numberOfLines={1} style={styles.appName}>
					{appName}
				</Text>
				<AppUsage packageName={packageName} />
			</TouchableOpacity>
		);
	};

	render() {
		const {top, left, bottom, right} = this.props;
		const {appList, v} = this.state;
		return (
			<>
				<TouchableOpacity
					onPress={this.loadApps}
					style={[styles.main, {top, left, bottom, right}]}>
					<Image style={styles.icon} source={icons.app} />
				</TouchableOpacity>
				<Modal
					animationType="slide"
					transparent
					visible={v}
					onRequestClose={this.handleClose}>
					<TouchableOpacity
						onPress={this.handleClose}
						activeOpacity={1}
						style={styles.modal}>
						<TouchableOpacity activeOpacity={1} style={styles.content}>
							<Text style={styles.title}>Productive Apps</Text>
							<Text style={styles.subTitle}>
								Make right choice put right apps here
							</Text>

							<View style={styles.appContent}>
								{appList.map(this.renderApp)}
							</View>

							{appList.length === 0 ? (
								<Text style={styles.emptyText}>...No Apps Added...</Text>
							) : null}
						</TouchableOpacity>
					</TouchableOpacity>
				</Modal>
			</>
		);
	}
}

const AppUsage = ({packageName}) => {
	const [appUsage, setAppUsage] = useState(0);
	const setStats = async () => {
		try {
			const usageInMills = await AppManager.getUsageStatus(packageName);
			setAppUsage(Math.round(usageInMills / helper.MILLI_SEC_IN_MIN));
		} catch {
			//Ignore
		}
	};
	useEffect(() => {
		setStats();
	});
	return <Text style={styles.appUsage}>{appUsage} min</Text>;
};

const styles = {
	main: {
		position: 'absolute',
		width: size,
		height: size,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.textColor,
		borderRadius: 100,
	},
	icon: {
		width: iconSize,
		height: iconSize,
		tintColor: colors.background,
	},
	modal: {
		backgroundColor: colors.backgroundB4,
		height: helper.height,
		width: helper.width,
	},
	content: {
		paddingBottom: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: colors.lightF2,
		position: 'absolute',
		width: '100%',
		bottom: 0,
		padding: 10,
	},
	title: {
		fontSize: fontSize.h4,
		color: colors.textColor,
		fontFamily: fontFamily.medium,
	},
	subTitle: {
		fontSize: fontSize.h5,
		color: colors.textColor,
		fontFamily: fontFamily.light,
	},
	appName: {
		fontSize: fontSize.h42,
		color: colors.textColor,
		fontFamily: fontFamily.medium,
	},
	appUsage: {
		fontSize: fontSize.h5,
		color: colors.textColor,
		fontFamily: fontFamily.light,
	},
	appCard: {
		width: '48%',
		height: 40,
		marginVertical: 10,
		borderColor: colors.borderColor,
		borderWidth: 0.5,
		justifyContent: 'center',
		paddingLeft: 5,
		borderRadius: 5,
	},
	appContent: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	emptyText: {
		textAlign: 'center',
		marginVertical: 20,
		fontSize: fontSize.h4,
		color: colors.textColor,
		fontFamily: fontFamily.light,
	},
};
