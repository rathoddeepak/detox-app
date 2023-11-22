import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import moment from 'moment';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import themes from 'themes';

function calculateTimeLeft(targetDate) {
	// Parse the input date string
	const targetTime = new Date(targetDate).getTime();

	// Get the current time
	const currentTime = new Date().getTime();

	// Calculate the time difference in milliseconds
	let timeDifference = targetTime - currentTime;

	// Calculate days, hours, minutes, and seconds
	const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	timeDifference %= 1000 * 60 * 60 * 24;

	const hours = Math.floor(timeDifference / (1000 * 60 * 60));
	timeDifference %= 1000 * 60 * 60;

	const minutes = Math.floor(timeDifference / (1000 * 60));
	timeDifference %= 1000 * 60;

	const seconds = Math.floor(timeDifference / 1000);

	// Create the time left string
	let tl = '';

	if (days > 0) {
		tl += days + (days === 1 ? ' day ' : ' days ');
	}

	if (hours > 0) {
		tl += hours + (hours === 1 ? ' hour ' : ' hours ');
	}

	if (minutes > 0) {
		tl += minutes + (minutes === 1 ? ' minute ' : ' minutes ');
	}

	if (seconds > 0) {
		tl += seconds + (seconds === 1 ? ' second ' : ' seconds ');
	}

	return tl.trim();
}

const TimeUntil = () => {
	const currentTimeRef = useRef();
	const [timeLeft, setTimeLeft] = useState('Long Press me to set timer');
	const selectTime = () => {
		DateTimePickerAndroid.open({
			mode: 'time',
			value: new Date(),
			onChange: handleChange,
		});
	};

	const handleChange = event => {
		console.log(event);
	};

	useEffect(() => {
		() => {
			clearTimeout(currentTimeRef.current);
		};
	}, []);

	return (
		<View style={styles.main}>
			<Text onLongPress={selectTime} style={styles.text}>
				{timeLeft}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: themes.colors.background,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		width: '90%',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: themes.colors.foreground,
	},
});

export default TimeUntil;
