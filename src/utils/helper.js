import {Dimensions} from 'react-native';
import moment from 'moment';

let currentListener = null;
let currentInterval = null;

const addTimelistener = (listener = null) => {
	clearInterval(currentInterval);
	currentListener = listener;
	if (!currentListener) {
		return;
	}
	currentListener(moment());
	currentInterval = setInterval(() => {
		if (currentListener) {
			currentListener(moment());
		}
	}, 1000);
};

const removeTimeListener = () => {
	clearInterval(currentInterval);
	currentListener = null;
};
const MINUTES_IN_A_DAY = 1440;
const DAYS_IN_YEAR = 365;
const MILLI_SEC_IN_MIN = 60000;
const {width, height} = Dimensions.get('window');
const helper = {
	removeTimeListener,
	addTimelistener,
	width,
	height,

	MINUTES_IN_A_DAY,
	MILLI_SEC_IN_MIN,
	DAYS_IN_YEAR,
};

export default helper;
