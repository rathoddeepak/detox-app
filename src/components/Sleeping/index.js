// Written By Deepak Rathod 21 Jul 2023
// While Feeling Exhausted
import React, {Component} from 'react';

//React Native Components
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
//Helper Constants
import helper from 'utils/helper';
import themes from 'themes';
import moment from 'moment';

const animation = require('themes/anims/sleeping');

class Sleeping extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.navigationFocus = null;
		this.navigationBlur = null;
	}

	componentDidMount() {
		this.handleTimeChnage();
	}

	handleTimeChnage = () => {
		const currentTime = moment().format('HH:mm');
		const currentDay = moment().format('dddd, DD MMM');
		const newState = {
			currentTime,
			currentDay,
		};
		this.setState(newState);
	};

	render() {
		const {currentTime, currentDay} = this.state;
		return (
			<View style={styles.main}>
				<LottieView autoPlay loop source={animation} style={styles.anim} />

				<Text style={styles.qoute}>
					Tomorrow is the best day of your life, Recharge!
				</Text>
				<Text style={styles.timeText}>{currentTime}</Text>
				<Text style={styles.dayText}>{currentDay}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		height: helper.height,
		width: helper.width,
		justifyContent: 'center',
		alignItems: 'center',
		padding: '5%',
	},
	timeText: {
		marginTop: 10,
		color: themes.colors.borderColor,
		fontSize: themes.fontSize.h3,
		fontFamily: themes.fontFamily.regular,
	},
	dayText: {
		color: themes.colors.borderColor,
		fontSize: themes.fontSize.h5,
		fontFamily: themes.fontFamily.regular,
	},
	anim: {
		width: '90%',
		height: 200,
	},
	qoute: {
		marginTop: 10,
		fontFamily: 'times',
		color: themes.colors.borderColor,
		fontSize: themes.fontSize.h3,
		textAlign: 'center',
		width: '90%',
	},
});

export default Sleeping;
