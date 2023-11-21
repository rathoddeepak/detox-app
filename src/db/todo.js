import AsyncStorage from '@react-native-async-storage/async-storage';

let todoList = [];
const DB_KEY = '@TODO';

const save = async () => {
	const jsonValue = JSON.stringify(todoList);
	await AsyncStorage.setItem(DB_KEY, jsonValue);
};

const getAll = () => {
	return todoList;
};

const createTask = task => {
	todoList.push(task);
	save();
};

const removeTask = async idx => {
	todoList.splice(idx, 1);
	await save();
};

const init = async () => {
	try {
		const value = await AsyncStorage.getItem(DB_KEY);
		if (value !== null) {
			todoList = JSON.parse(value);
		} else {
			todoList = [];
		}
	} catch (e) {
		todoList = [];
	}
};

const todoDB = {
	getAll,
	createTask,
	removeTask,
	init,
};

export default todoDB;