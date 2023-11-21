import React, {Component} from 'react';

//React Native Components
import {
	View,
	StyleSheet,
	Modal,
	Image,
	Animated,
	Text,
	Pressable,
} from 'react-native';

//Custom Components
import ProgressBar from '..//ProgressBar';

//Helper Constants
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import helper from 'utils/helper';
import themes from 'themes';
import moment from 'moment';

const progressWidth = helper.width * 0.35;

class DateManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dayProgress: 0,
			dayLeftDate: null,
		};
	}

	componentDidMount() {
		this.setDayLeftDate();
		helper.addTimelistener(this.handleTimeChnage);
	}

	setDayLeftDate = async () => {
		const dayLeftDate = await AsyncStorage.getItem('dayLeftDate');
		if (dayLeftDate) {
			this.setState({
				dayLeftDate,
			});
		}
	};

	changeDate = () => {
		DateTimePickerAndroid.open({
			mode: 'date',
			value: new Date(),
			onChange: this.handleDateChange,
		});
	};

	handleDateChange = async e => {
		if (e.type !== 'set') {
			return;
		}
		const {
			nativeEvent: {timestamp},
		} = e;
		const dayLeftDate = moment(timestamp).format('YYYY-MM-DD');
		const nextYearStart = moment(dayLeftDate);
		await AsyncStorage.setItem('dayLeftDate', dayLeftDate);
		const daysLeft = nextYearStart.diff(moment(), 'days');
		this.setState({
			dayLeftDate,
			daysLeft,
		});
	};

	handleTimeChnage = currentMoment => {
		const dayLeftDate = this.state.dayLeftDate;
		const currentTime = currentMoment.format('HH:mm');
		const currentDay = currentMoment.format('dddd, DD MMM');
		const nextDayStart = moment(currentMoment).add(1, 'days').startOf('day');
		const nextYearStart = dayLeftDate
			? moment(dayLeftDate)
			: moment(currentMoment).add(1, 'year').startOf('year');

		const minutesLeft = nextDayStart.diff(currentMoment, 'minutes');
		const minutesProgress = helper.MINUTES_IN_A_DAY - minutesLeft;

		const minutesReminder = Math.round(minutesLeft / 60);
		const minutesLeftText = `${minutesReminder} Hrs ${Math.abs(
			minutesLeft - minutesReminder * 60,
		)} mins`;

		const dayDiff = minutesProgress / helper.MINUTES_IN_A_DAY;

		const daysInYear =
			helper.DAYS_IN_YEAR + (currentMoment.isLeapYear() ? 1 : 0);

		const daysLeft = nextYearStart.diff(currentMoment, 'days');
		const daysProgress = daysInYear - daysLeft;
		const yearDiff = daysProgress / daysInYear;
		const newState = {
			minutesLeftText,
			daysLeftText: daysLeft,
			currentTime,
			currentDay,
			dayProgress: Math.round(dayDiff * 100),
			yearProgress: Math.round(yearDiff * 100),
		};
		this.setState(newState);
	};

	render() {
		const {
			currentTime,
			currentDay,
			// yearProgress,
			dayProgress,
			daysLeftText,
			minutesLeftText,
			// daysLeftCount,
		} = this.state;
		return (
			<View style={styles.main}>
				<View style={styles.dateContent}>
					<Text style={styles.timeText}>{currentTime}</Text>
					<Text style={styles.dayText}>{currentDay}</Text>

					<Text style={styles.progressText}>
						Day In Progress {minutesLeftText}
					</Text>
					<ProgressBar top={5} progress={dayProgress} width={progressWidth} />
				</View>
				<Pressable onPress={this.changeDate} style={styles.endContent}>
					<Text style={styles.mainDate}>{daysLeftText}</Text>
					<Text style={styles.mainDateDesc}>Days Left</Text>
				</Pressable>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		borderRadius: 10,
		borderWidth: 1,
		height: 139,
		flexDirection: 'row',
		borderColor: themes.colors.foregroundLight,
	},
	endContent: {
		width: 120,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderLeftWidth: 1,
		borderColor: themes.colors.foregroundLight,
	},
	dateContent: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	timeText: {
		fontWeight: 'bold',
		color: themes.colors.foreground,
		fontSize: themes.fontSize.h2,
		fontFamily: themes.fontFamily.regular,
	},
	dayText: {
		color: themes.colors.foreground,
		fontSize: themes.fontSize.h5,
		fontFamily: themes.fontFamily.regular,
	},
	progressText: {
		color: themes.colors.foreground,
		fontSize: themes.fontSize.h5,
		marginTop: 10,
		marginBottom: 3,
	},
	mainDate: {
		fontSize: 40,
		fontWeight: 'bold',
		color: themes.colors.foreground,
	},
	mainDateDesc: {
		marginTop: 5,
		fontSize: themes.fontSize.h4,
		color: themes.colors.foreground,
	},
});

export default DateManager;
