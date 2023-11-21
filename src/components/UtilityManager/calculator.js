import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import themes from 'themes';

function Button({title, onPress, isBlue, isGray}) {
	return (
		<TouchableOpacity
			style={
				isBlue ? styles.btnBlue : isGray ? styles.btnDark : styles.btnLight
			}
			onPress={onPress}>
			<Text
				style={isBlue || isGray ? styles.smallTextLight : styles.smallTextDark}>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

function Calculator() {
	const [firstNumber, setFirstNumber] = useState('');
	const [secondNumber, setSecondNumber] = useState('');
	const [operation, setOperation] = useState('');
	const [result, setResult] = useState(null);

	const handleNumberPress = buttonValue => {
		if (firstNumber.length < 10) {
			setFirstNumber(firstNumber + buttonValue);
		}
	};

	const handleOperationPress = buttonValue => {
		setOperation(buttonValue);
		setSecondNumber(firstNumber);
		setFirstNumber('');
	};

	const clear = () => {
		setFirstNumber('');
		setSecondNumber('');
		setOperation('');
		setResult(null);
	};

	const firstNumberDisplay = () => {
		if (result !== null) {
			return (
				<Text
					style={
						result < 99999
							? [styles.screenFirstNumber, {color: '#46D5B2'}]
							: [styles.screenFirstNumber, {fontSize: 18, color: '#46D5B2'}]
					}>
					{result?.toString()}
				</Text>
			);
		}
		if (firstNumber && firstNumber.length < 6) {
			return <Text style={styles.screenFirstNumber}>{firstNumber}</Text>;
		}
		if (firstNumber === '') {
			return <Text style={styles.screenFirstNumber}>{'0'}</Text>;
		}
		if (firstNumber.length > 5 && firstNumber.length < 8) {
			return (
				<Text style={[styles.screenFirstNumber, {fontSize: 18}]}>
					{firstNumber}
				</Text>
			);
		}
		if (firstNumber.length > 7) {
			return (
				<Text style={[styles.screenFirstNumber, {fontSize: 18}]}>
					{firstNumber}
				</Text>
			);
		}
	};

	const getResult = () => {
		switch (operation) {
			case '+':
				clear();
				var result1 = parseFloat(secondNumber) + parseFloat(firstNumber);
				setResult(result1);
				setFirstNumber('' + result1);
				setResult(null);
				break;
			case '-':
				clear();
				var result = parseFloat(secondNumber) - parseFloat(firstNumber);
				setResult(result);
				setFirstNumber('' + result);
				setResult(null);
				break;
			case '*':
				clear();
				var result = parseFloat(secondNumber) * parseFloat(firstNumber);
				setResult(result);
				setFirstNumber('' + result);
				setResult(null);
				break;
			case '/':
				clear();
				var result = parseFloat(secondNumber) / parseFloat(firstNumber);
				setResult(result);
				setFirstNumber('' + result);
				setResult(null);
				break;
			case '^':
				clear();
				var result = Math.pow(parseInt(secondNumber), parseInt(firstNumber));
				setResult(result);
				setFirstNumber('' + result);
				setResult(null);
				break;

			case '%':
				clear();
				var result = (parseFloat(secondNumber) * parseFloat(firstNumber)) / 100;
				setResult(result);
				setFirstNumber('' + result);
				setResult(null);
				break;
		}
	};

	return (
		<View>
			<View style={styles.input}>
				<Text style={styles.screenSecondNumber}>
					{secondNumber}
					<Text
						style={{
							color: themes.colors.foreground,
							fontSize: 18,
							fontWeight: '500',
						}}>
						{operation}
					</Text>
					{firstNumberDisplay()}
				</Text>
			</View>
			<View style={styles.row}>
				<Button title="AC" isGray onPress={clear} />
				<Button title="^" isGray onPress={() => handleOperationPress('^')} />
				<Button title="%" isGray onPress={() => handleOperationPress('%')} />
				<Button title="÷" isBlue onPress={() => handleOperationPress('/')} />
			</View>
			<View style={styles.row}>
				<Button title="7" onPress={() => handleNumberPress('7')} />
				<Button title="8" onPress={() => handleNumberPress('8')} />
				<Button title="9" onPress={() => handleNumberPress('9')} />
				<Button title="x" isBlue onPress={() => handleOperationPress('*')} />
			</View>
			<View style={styles.row}>
				<Button title="4" onPress={() => handleNumberPress('4')} />
				<Button title="5" onPress={() => handleNumberPress('5')} />
				<Button title="6" onPress={() => handleNumberPress('6')} />
				<Button title="-" isBlue onPress={() => handleOperationPress('-')} />
			</View>
			<View style={styles.row}>
				<Button title="1" onPress={() => handleNumberPress('1')} />
				<Button title="2" onPress={() => handleNumberPress('2')} />
				<Button title="3" onPress={() => handleNumberPress('3')} />
				<Button title="+" isBlue onPress={() => handleOperationPress('+')} />
			</View>
			<View style={styles.row}>
				<Button title="." onPress={() => handleNumberPress('.')} />
				<Button title="0" onPress={() => handleNumberPress('0')} />
				<Button
					title="Del"
					onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
				/>
				<Button title="=" isBlue onPress={() => getResult()} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	btnBlue: {
		width: 50,
		height: 30,
		borderRadius: 8,
		backgroundColor: themes.colors.foregroundLight,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 8,
	},
	btnDark: {
		width: 50,
		height: 30,
		borderRadius: 8,
		backgroundColor: themes.colors.foregroundLight,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 8,
	},
	btnLight: {
		width: 50,
		height: 30,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: themes.colors.foregroundLight,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 8,
	},
	btnGray: {
		width: 50,
		height: 30,
		borderRadius: 8,
		backgroundColor: themes.colors.foregroundLight,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 8,
	},
	smallTextLight: {
		fontSize: 15,
		fontWeight: 'bold',
		color: themes.colors.foreground,
	},
	smallTextDark: {
		fontSize: 15,
		fontWeight: 'bold',
		color: themes.colors.foreground,
	},
	// Keyboard
	row: {
		maxWidth: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	screenFirstNumber: {
		fontSize: 18,
		color: themes.colors.foreground,
		fontWeight: 'bold',
		alignSelf: 'flex-end',
	},
	screenSecondNumber: {
		fontSize: 18,
		color: themes.colors.foreground,
		fontWeight: 'bold',
		alignSelf: 'flex-end',
	},
	input: {
		height: 40,
		width: '88%',
		justifyContent: 'center',
		alignSelf: 'center',
	},
});

export default Calculator;