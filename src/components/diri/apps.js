import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import {icons, colors, fontFamily, fontSize} from 'themes';
import helper from 'utils/helper';
import AppManager from 'libs/AppManager';
const appSize = helper.width / 4.5;
class Apps extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appList: [
				{
					appName: 'Browser',
					packageName: 'com.android.chrome',
					icon: icons.browser,
				},
				{
					appName: 'Tube',
					packageName: 'com.github.libretube',
					icon: icons.tube,
				},
				{
					appName: 'Music',
					packageName: 'com.vanced.android.apps.youtube.music',
					icon: icons.music,
				},
				{
					appName: 'Paytm',
					packageName: 'net.one97.paytm',
					icon: icons.paytm,
				},
				{
					appName: 'Phonepe',
					packageName: 'com.phonepe.app',
					icon: icons.phonepe,
				},
				{
					appName: 'Signal',
					packageName: 'org.thoughtcrime.securesms',
					icon: icons.chat,
				},
			],
			v: false,
		};
	}

	show = () => {
		this.setState({v: true});
	};

	handleClose = () => {
		this.setState({
			v: false,
		});
	};

	openApp = packageName => {
		this.handleClose();
		AppManager.startAppByPackageName(packageName);
	};

	renderApp = ({appName, packageName, icon}, index) => {
		return (
			<TouchableOpacity
				onPress={() => this.openApp(packageName)}
				style={styles.appCard}
				key={index}>
				<Image style={styles.icon} source={icon} />
				<Text numberOfLines={1} style={styles.appName}>
					{appName}
				</Text>
			</TouchableOpacity>
		);
	};

	render() {
		const {appList, v} = this.state;
		return (
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
						<Text style={styles.title}>Apps</Text>
						<Text style={styles.subTitle}>
							Make right choice put right apps here
						</Text>

						<View style={styles.appContent}>{appList.map(this.renderApp)}</View>
					</TouchableOpacity>
				</TouchableOpacity>
			</Modal>
		);
	}
}

const styles = {
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
	appCard: {
		width: appSize,
		height: appSize,
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	appName: {
		fontSize: 15,
		color: colors.textColor,
		marginTop: 5,
		fontFamily: '500',
	},
	icon: {
		width: 30,
		height: 30,
		tintColor: colors.borderColor,
	},
	appContent: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
};
export default Apps;