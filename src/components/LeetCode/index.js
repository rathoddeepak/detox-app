import React, {Component} from 'react';
import {View, Text, RefreshControl, ScrollView} from 'react-native';
import themes from 'themes';
import LeetBackend from 'backend/leetCode';
import {PieChart, ContributionGraph} from 'react-native-chart-kit';
import helper from 'utils/helper';
import moment from 'moment';
const chartConfig = {
	backgroundGradientFrom: '#1E2923',
	backgroundGradientFromOpacity: 0,
	backgroundGradientTo: '#08130D',
	backgroundGradientToOpacity: 0.5,
	color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
	strokeWidth: 2, // optional, default 3
	barPercentage: 0.5,
	useShadowColorFromDataset: false, // optional
};
const pieWidth = helper.width * 0.9;
export default class LeetCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submissions: [],
			countList: [],
			calendar: [],
		};
	}

	componentDidMount() {
		this.init();
	}

	init = () => {
		this.initStats();
		this.initCalendar();
	};

	refresh = () => {
		this.setState(
			{
				calendar: [],
				submissions: [],
				countList: [],
			},
			this.init,
		);
	};

	initStats = async () => {
		const stats = await LeetBackend.getUserStats();
		if (!stats?.data) {
			return;
		}
		const data = stats?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
		const countList = [...data];
		const list = data?.splice(1, 4);
		const COLORS = {
			Easy: '#02af9b',
			Medium: '#ffb800',
			Hard: '#ff3b5e',
		};
		const submissions = list.map(value => ({
			count: value.count,
			name: value.difficulty,
			legendFontColor: COLORS[value.difficulty],
			color: COLORS[value.difficulty],
			legendFontSize: 16,
		}));
		this.setState({submissions, countList});
	};

	initCalendar = async () => {
		const calendar = await LeetBackend.getUserCalendar();
		if (calendar?.data) {
			const keyString =
				calendar?.data?.matchedUser?.userCalendar?.submissionCalendar || '{}';
			const keyJSON = JSON.parse(keyString);
			const data = Object.keys(keyJSON).map(key => {
				return {
					date: moment.unix(key).format('YYYY-MM-DD'),
					count: keyJSON[key],
				};
			});
			this.setState({calendar: data});
		}
	};

	renderCount = (problem, index) => {
		return (
			<View style={styles.countCard} key={index}>
				<Text style={styles.countTitle}>
					{problem.difficulty} {problem.count}
				</Text>
			</View>
		);
	};

	renderData = () => {
		const {submissions, countList} = this.state;
		return (
			<>
				<PieChart
					data={submissions}
					width={pieWidth}
					height={200}
					style={styles.pie}
					accessor="count"
					chartConfig={{
						color: (opacity = 1) => themes.colors.textColor,
						labelColor: (opacity = 1) => themes.colors.textColor,
					}}
				/>
				<View style={styles.countRow}>{countList.map(this.renderCount)}</View>
			</>
		);
	};

	renderCalendar = () => {
		const {calendar} = this.state;
		return (
			<ContributionGraph
				values={calendar}
				endDate={new Date()}
				numDays={100}
				width={pieWidth}
				height={220}
				accessor="count"
				paddingLeft={0}
				chartConfig={chartConfig}
			/>
		);
	};
	render() {
		return (
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={false} onRefresh={this.refresh} />
				}>
				<View style={styles.main}>
					<Text style={styles.title}>rathoddeepak537</Text>
					<Text style={styles.subTitle}>Track LeetCode Stats</Text>
					{this.state.submissions.length > 0 ? this.renderData() : null}
					{this.state.calendar.length > 0 ? this.renderCalendar() : null}
				</View>
			</ScrollView>
		);
	}
}

const styles = {
	main: {
		flex: 1,
	},
	pie: {marginTop: 20},
	title: {
		fontSize: themes.fontSize.h3,
		color: themes.colors.textColor,
		fontFamily: themes.fontFamily.medium,
	},
	subTitle: {
		marginTop: 5,
		fontSize: themes.fontSize.h4,
		color: themes.colors.textColor,
		fontFamily: themes.fontFamily.regular,
	},
	countCard: {
		width: '48%',
		height: 45,
		marginBottom: 15,
		paddingLeft: 10,
		justifyContent: 'center',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: themes.colors.borderColor,
	},
	countTitle: {
		fontSize: themes.fontSize.h4,
		color: themes.colors.textColor,
		fontFamily: themes.fontFamily.regular,
	},
	countRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
};