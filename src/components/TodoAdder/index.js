import React, {Component} from 'react';
import {TouchableOpacity, TextInput, Text, Modal} from 'react-native';
import {colors, fontFamily, fontSize} from 'themes';
import helper from 'utils/helper';
import TodoDB from 'db/todo';

export default class FrequentApps extends Component {
	constructor(props) {
		super(props);
		this.state = {
			task: '',
			v: false,
		};
	}

	handleClose = () => {
		this.setState({
			v: false,
		});
	};

	show = () => {
		this.setState({v: true});
	};

	addTask = () => {
		this.handleClose();
		const task = this.state.task;
		if (task?.length > 0) {
			TodoDB.createTask(task);
		}
	};

	render() {
		const {v} = this.state;
		return (
			<Modal
				animationType="slide"
				transparent
				visible={v}
				statusBarTranslucent
				onRequestClose={this.handleClose}>
				<TouchableOpacity
					onPress={this.handleClose}
					activeOpacity={1}
					style={styles.modal}>
					<TouchableOpacity activeOpacity={1} style={styles.content}>
						<Text style={styles.title}>Add Task</Text>

						<TextInput
							selectionColor={colors.foregroundLight}
							style={styles.input}
							onChangeText={task => this.setState({task})}
						/>

						<TouchableOpacity onPress={this.addTask} style={styles.button}>
							<Text style={styles.buttonText}>Submit</Text>
						</TouchableOpacity>
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
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		padding: 10,
		borderRadius: 10,
		backgroundColor: colors.lightF2,
		width: '90%',
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
	input: {
		borderColor: colors.borderColor,
		borderWidth: 1,
		width: '100%',
		height: 45,
		borderRadius: 10,
		marginTop: 10,
		color: colors.pureWhite,
	},
	button: {
		width: '100%',
		height: 45,
		borderRadius: 10,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.borderColor,
	},
	buttonText: {
		fontSize: 15,
		marginVertical: 10,
		color: colors.background,
		fontWeight: '500',
	},
};
