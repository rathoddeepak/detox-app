import AsyncStorage from '@react-native-async-storage/async-storage';

let todoList = [];
const DB_KEY = '@TODO';

const save = () => {
	const jsonValue = JSON.stringify(todoList);
	AsyncStorage.setItem(DB_KEY, jsonValue);
};

const getAll = () => {
	return todoList;
};

const createTask = task => {
	todoList.push(task);
	save();
};

const removeTask = idx => {
	todoList.splice(idx, 1);
	save();
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
