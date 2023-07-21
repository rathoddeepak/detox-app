// Written By Deepak Rathod 21 May 2023
// While Feeling Exhausted
import React, {Component} from 'react';

//React Native Components
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	FlatList,
	Modal,
} from 'react-native';

//Helper Constants
import helper from 'utils/helper';
import themes from 'themes';
//Libs
import AppManager from 'libs/AppManager';
import FrequentAppDB from 'db/FrequentApps';

class AppHolder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appList: [],
			tempAppList: [],
		};
		this.currentTimeout = null;
	}

	componentDidMount() {
		setTimeout(() => {
			this.init();
		}, 1000);
	}

	init = async () => {
		const apps = await AppManager.getNonSystemApps();
		const onlyUnique = (value, index, array) => {
			return (
				array.findIndex(v => v.packageName === value.packageName) === index
			);
		};
		const appList = apps.filter(onlyUnique);
		this.setState({
			tempAppList: appList,
			appList,
		});
	};

	handleSearch = text => {
		clearTimeout(this.currentTimeout);
		const searchKey = text.toLowerCase();
		const search = () => {
			const appList = this.state.tempAppList.filter(({appName}) =>
				appName.toLowerCase().includes(searchKey),
			);
			this.setState({appList});
		};
		this.currentTimeout = setTimeout(() => {
			search();
		}, 400);
	};

	reset = () => {
		this.setState({appList: []}, () => {
			setTimeout(() => {
				this.init();
			}, 400);
		});
	};

	render() {
		const {appList} = this.state;
		return (
			<View style={styles.main}>
				<View style={styles.content}>
					<View style={styles.searchBar}>
						<TextInput
							placeholder="Search Apps"
							onChangeText={this.handleSearch}
							placeholderTextColor={themes.colors.borderColor}
							style={styles.searchInput}
						/>
					</View>
					<FlatList
						refreshing={false}
						data={appList}
						onRefresh={this.reset}
						keyExtractor={item => item.packageName}
						renderItem={({item}) => (
							<AppItem onOption={() => this.options.show(item)} data={item} />
						)}
					/>
				</View>
				<Options ref={ref => (this.options = ref)} />
			</View>
		);
	}
}

class AppItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appUsage: 0,
		};
	}

	componentDidMount() {
		this.setStats();
	}

	setStats = async () => {
		try {
			const usageInMills = await AppManager.getUsageStatus(
				this.props.data.packageName,
			);
			const appUsage = Math.round(usageInMills / helper.MILLI_SEC_IN_MIN);
			this.setState({appUsage});
		} catch (err) {
			// console.log(err);
			//Ignore
		}
	};

	openApp = packageName => {
		if (packageName === 'com.google.android.youtube') {
			packageName = 'com.github.libretube';
		}
		AppManager.startAppByPackageName(packageName);
	};

	render() {
		const {data} = this.props;
		const {appUsage} = this.state;
		return (
			<TouchableOpacity
				onLongPress={this.props.onOption}
				onPress={() => this.openApp(data.packageName)}
				style={styles.appCard}>
				<Text style={styles.appName}>{data.appName} </Text>
				{appUsage > 0 ? (
					<Text style={styles.appUsage}>{appUsage} min</Text>
				) : null}
			</TouchableOpacity>
		);
	}
}

class Options extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentApp: null,
			v: false,
		};
	}

	show = (app, cb) => {
		this.setState({
			currentApp: app,
			v: true,
		});
	};

	hide = () => {
		this.setState({
			currentApp: null,
			v: false,
		});
	};

	handleAdd = () => {
		const app = this.state.currentApp;
		FrequentAppDB.addApp(app);
		this.hide();
	};

	handleRemove = () => {
		const app = this.state.currentApp;
		FrequentAppDB.removeApp(app);
		this.hide();
	};

	render() {
		const {v} = this.state;
		return (
			<Modal
				animationType="slide"
				transparent
				visible={v}
				onRequestClose={this.hide}>
				<TouchableOpacity
					onPress={this.hide}
					activeOpacity={1}
					style={modalStyles.modal}>
					<TouchableOpacity activeOpacity={1} style={modalStyles.content}>
						<Text style={modalStyles.title}>Productive Apps</Text>
						<Text style={modalStyles.subTitle}>
							Add Productive apps for quiz access
						</Text>

						<TouchableOpacity
							onPress={this.handleAdd}
							style={modalStyles.optionCover}>
							<Text style={modalStyles.optionText}>Add To Home</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.handleRemove}
							style={modalStyles.optionCover}>
							<Text style={modalStyles.optionText}>Remove From Home</Text>
						</TouchableOpacity>
					</TouchableOpacity>
				</TouchableOpacity>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		height: helper.height,
		width: helper.width,
	},
	content: {
		padding: '5%',
		flex: 1,
	},
	searchBar: {
		width: '100%',
		height: 45,
		borderRadius: 5,
		backgroundColor: themes.colors.lightF2,
		justifyContent: 'center',
	},
	searchInput: {
		fontSize: themes.fontSize.h42,
		color: themes.colors.textColor,
		paddingLeft: 16,
		fontFamily: themes.fontFamily.regular,
	},
	appCard: {
		height: 40,
		width: '98%',
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	appName: {
		fontSize: themes.fontSize.h4,
		color: themes.colors.textColor,
	},
	appUsage: {
		fontSize: themes.fontSize.h6,
		borderRadius: 10,
		paddingHorizontal: 6,
		paddingVertical: 5,
		backgroundColor: themes.colors.lightF2,
		color: themes.colors.textColor,
	},
});

const modalStyles = {
	modal: {
		backgroundColor: themes.colors.backgroundB4,
		height: helper.height,
		width: helper.width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		padding: 15,
		borderRadius: 10,
		backgroundColor: themes.colors.lightF2,
		position: 'absolute',
		width: '90%',
	},
	title: {
		fontSize: themes.fontSize.h4,
		color: themes.colors.textColor,
		fontFamily: themes.fontFamily.medium,
	},
	subTitle: {
		fontSize: themes.fontSize.h5,
		color: themes.colors.textColor,
		fontFamily: themes.fontFamily.light,
		marginBottom: 10,
	},
	optionCover: {
		width: '100%',
		height: 30,
		justifyContent: 'center',
	},
	optionText: {
		fontSize: themes.fontSize.h42,
		color: themes.colors.textColor,
		fontFamily: themes.fontFamily.light,
	},
};

export default AppHolder;