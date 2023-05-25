import AsyncStorage from '@react-native-async-storage/async-storage';

let frequentApps = [];
const DB_KEY = '@FA';

const save = () => {
	const jsonValue = JSON.stringify(frequentApps);
	AsyncStorage.setItem(DB_KEY, jsonValue);
};

const getAll = () => {
	return frequentApps;
};

const addApp = appx => {
	const hasAdded = frequentApps.find(
		app => app.packageName === appx.packageName,
	);
	if (!hasAdded) {
		frequentApps.push(appx);
	}
	save();
};

const removeApp = appx => {
	const appIndex = frequentApps.findIndex(
		app => app.packageName === appx.packageName,
	);
	if (appIndex !== -1) {
		frequentApps.splice(appIndex, 1);
	}
	save();
};

const init = async () => {
	try {
		const value = await AsyncStorage.getItem(DB_KEY);
		if (value !== null) {
			frequentApps = JSON.parse(value);
		} else {
			frequentApps = [];
		}
	} catch (e) {
		frequentApps = [];
	}
};

const FrequentAppDB = {
	getAll,
	addApp,
	removeApp,
	init,
};

export default FrequentAppDB;