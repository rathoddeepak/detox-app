import React, {useState, useEffect, useRef} from 'react';

//React Native Components
import {View, StyleSheet, Text, Pressable} from 'react-native';
import TodoAdder from '../TodoAdder';
import TodoDB from 'db/todo';
import themes from 'themes';

const Todo = () => {
	const todoAdder = useRef();
	const [tasks, setTasks] = useState([]);

	const initDB = async () => {
		await TodoDB.init();
		const mTasks = TodoDB.getAll();
		setTasks(mTasks);
	};

	const removeTask = async idx => {
		await TodoDB.removeTask(idx);
		initDB();
	};

	const addNew = () => {
		todoAdder.current.show();
	};

	useEffect(() => {
		initDB();
	}, []);

	const renderTask = (task, idx) => {
		return (
			<View style={styles.task} key={task + idx}>
				<Pressable style={styles.checkBox} onPress={() => removeTask(idx)} />
				<Text style={styles.taskTxt}>{task}</Text>
			</View>
		);
	};

	return (
		<>
			{tasks.map(renderTask)}
			<TodoAdder ref={todoAdder} />
			<Text onPress={addNew} style={styles.addNew}>
				Add new todo
			</Text>
		</>
	);
};

const styles = StyleSheet.create({
	task: {
		borderWidth: 1,
		borderColor: themes.colors.foregroundLight,
		borderRadius: 5,
		width: '100%',
		flexDirection: 'row',
		padding: 10,
		marginTop: 10,
	},
	taskTxt: {
		fontSize: themes.fontSize.h4,
		color: themes.colors.foreground,
	},
	checkBox: {
		borderColor: themes.colors.foreground,
		borderWidth: 2,
		borderRadius: 50,
		width: 20,
		height: 20,
		marginRight: 5,
	},
	addNew: {
		marginTop: 10,
		fontSize: themes.fontSize.h4,
		fontWeight: 'bold',
		textAlign: 'center',
		color: themes.colors.foregroundLight,
	},
});

export default Todo;
