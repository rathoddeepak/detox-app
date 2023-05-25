// Written By Deepak Rathod 21 May 2023
// While Feeling Exhausted
import React, {Component} from 'react';

//React Native Components
import {View, StyleSheet, Text} from 'react-native';

//Custom Components
import ProgressBar from 'components/ProgressBar';
import CallButton from 'components/CallButton';
import FrequentApps from 'components/FrequentApps';

//Helper Constants
import helper from 'utils/helper';
import themes from 'themes';
import moment from 'moment';
import QuoteBackend from 'backend/qoute';

const progressWidth = helper.width * 0.35;
const defaultQuote = 'Not Stopping here...';
const defaultAuthor = 'Deepak Rathod';

class FocusHolder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dayProgress: 0,
			qoute: defaultQuote,
			qouteAuhtor: defaultAuthor,
		};
		this.navigationFocus = null;
		this.navigationBlur = null;
	}

	componentDidMount() {
		const navigation = this.props.nav;
		// this.navigationFocus = navigation.addListener('focus', () => {
		helper.addTimelistener(this.handleTimeChnage);
		// });
		this.loadQuote();
	}

	loadQuote = async () => {
		this.setState({qoute: defaultQuote, qouteAuthor: defaultAuthor});
		const qouteData = await QuoteBackend.get();
		if (qouteData?.length > 0) {
			this.setState({
				qoute: qouteData[0].content,
				qouteAuthor: qouteData[0].author,
			});
		}
	};

	componentWillUnmount() {
		helper.removeTimeListener();
		if (this.navigationFocus) {
			this.navigationFocus();
		}
		if (this.navigationBlur) {
			this.navigationBlur();
		}
	}

	handleTimeChnage = currentMoment => {
		const currentTime = currentMoment.format('HH:mm');
		const currentDay = currentMoment.format('dddd, DD MMM');
		const nextDayStart = moment(currentMoment).add(1, 'days').startOf('day');
		const nextYearStart = moment(currentMoment).add(1, 'year').startOf('year');

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
			daysLeftText: `${daysLeft} Days`,
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
			yearProgress,
			dayProgress,
			daysLeftText,
			minutesLeftText,
			qoute,
			qouteAuthor,
		} = this.state;
		return (
			<View style={styles.main}>
				<View style={styles.content}>
					<Text style={styles.timeText}>{currentTime}</Text>
					<Text style={styles.dayText}>{currentDay}</Text>

					<Text style={styles.progressText}>
						Year In Progress {daysLeftText}
					</Text>
					<ProgressBar top={5} progress={yearProgress} width={progressWidth} />

					<Text style={styles.progressText}>
						Day In Progress {minutesLeftText}
					</Text>
					<ProgressBar top={5} progress={dayProgress} width={progressWidth} />

					<View style={styles.qouteCover}>
						<Text onPress={this.loadQuote} style={styles.qoute}>
							{qoute} <Text style={styles.qouteAuthor}>- {qouteAuthor}</Text>
						</Text>
					</View>

					<CallButton right={20} bottom={30} />
					<FrequentApps left={20} bottom={30} />
				</View>
			</View>
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
	timeText: {
		color: themes.colors.textColor,
		fontSize: themes.fontSize.h3,
		fontFamily: themes.fontFamily.regular,
	},
	dayText: {
		color: themes.colors.textColor,
		fontSize: themes.fontSize.h5,
		fontFamily: themes.fontFamily.regular,
	},
	progressText: {
		color: themes.colors.textColor,
		fontSize: themes.fontSize.h42,
		marginTop: 20,
	},
	qouteCover: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	qoute: {
		fontFamily: 'times',
		color: themes.colors.borderColor,
		fontSize: themes.fontSize.h3,
		textAlign: 'center',
		width: '90%',
	},
	qouteAuthor: {
		fontSize: themes.fontSize.h4,
	},
});

export default FocusHolder;
