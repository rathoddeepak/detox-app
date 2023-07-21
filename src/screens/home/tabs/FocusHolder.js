// Written By Deepak Rathod 21 May 2023
// While Feeling Exhausted
import React, {Component} from 'react';

//React Native Components
import {
	View,
	StyleSheet,
	FlatList,
	Animated,
	Text,
	TouchableOpacity,
} from 'react-native';

//Custom Components
import Diri from 'components/diri';
import ProgressBar from 'components/ProgressBar';
import CallButton from 'components/CallButton';
import FrequentApps from 'components/FrequentApps';
//Helper Constants
import helper from 'utils/helper';
import themes from 'themes';
import moment from 'moment';
import QuoteBackend from 'backend/qoute';
import TodoDB from 'db/todo';

const progressWidth = helper.width * 0.35;
const defaultQuote = 'Not Stopping here...';
const defaultAuthor = 'Deepak Rathod';
const itemSize = 80;
const containerSize = 120;

class FocusHolder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dayProgress: 0,
			qoute: defaultQuote,
			qouteAuhtor: defaultAuthor,
			tasks: [],
			scrollY: new Animated.Value(1),
		};
		this.navigationFocus = null;
		this.navigationBlur = null;
	}

	componentDidMount() {
		const navigation = this.props.nav;
		// this.navigationFocus = navigation.addListener('focus', () => {
		helper.addTimelistener(this.handleTimeChnage);
		// });
		this.reset();
	}

	reset = () => {
		const tasks = TodoDB.getAll();
		this.setState({
			tasks,
		});
	};

	remove = idx => {
		TodoDB.removeTask(idx);
		this.reset();
	};

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

	renderTasks = ({item: task, index}) => {
		const {scrollY} = this.state;
		const startPosition = index * itemSize;
		const pos1 = startPosition - containerSize;
		const pos2 = startPosition + itemSize - containerSize;

		const inputRange = [pos1, pos2];
		const scale = scrollY.interpolate({
			inputRange,
			outputRange: [0.8, 1],
			extrapolate: 'clamp',
		});
		const opacity = scrollY.interpolate({
			inputRange: inputRange,
			outputRange: [0, 1],
			extrapolate: 'clamp',
		});
		return (
			<Animated.View
				onLongPress={() => this.remove(index)}
				key={index}
				activeOpacity={1}
				style={[
					styles.task,
					{
						transform: [
							{
								scale,
							},
						],
						opacity,
					},
				]}>
				<TouchableOpacity
					activeOpacity={1}
					style={styles.tk}
					onLongPress={() => this.remove(index)}>
					<Text style={styles.qoute}>{task}</Text>
				</TouchableOpacity>
			</Animated.View>
		);
	};

	render() {
		const {
			currentTime,
			currentDay,
			yearProgress,
			dayProgress,
			daysLeftText,
			minutesLeftText,
			tasks,
			scrollY,
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

					{/*<View style={styles.qouteCover}>
						<Text onPress={this.loadQuote} style={styles.qoute}>
							{qoute} <Text style={styles.qouteAuthor}>- {qouteAuthor}</Text>
						</Text>
					</View>*/}
					<View style={styles.list}>
						<View style={styles.qouteCover}>
							<Animated.FlatList
								onScroll={Animated.event(
									[{nativeEvent: {contentOffset: {y: scrollY}}}],
									{useNativeDriver: true},
								)}
								showsVerticalScrollIndicator={false}
								keyExtractor={item => item.key}
								renderItem={this.renderTasks}
								data={tasks}
							/>
						</View>
					</View>
					<Diri />
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
	list: {flex: 1, justifyContent: 'center'},
	qouteCover: {
		height: 120,
		justifyContent: 'center',
		marginTop: 20,
		width: '100%',
	},
	task: {
		backgroundColor: '#262D34',
		height: 80,
		marginBottom: 10,
		borderRadius: 10,
		padding: 10,
		width: '93%',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: themes.colors.borderColor,
	},
	qoute: {
		fontFamily: 'times',
		color: themes.colors.borderColor,
		fontSize: 15,
		width: '100%',
		textAlign: 'center',
	},
	qouteAuthor: {
		fontSize: themes.fontSize.h4,
	},
});

export default FocusHolder;