import phone from './iconAssets/phone.png';
import app from './iconAssets/app.png';
import todo from './iconAssets/todo.png';
import browser from './iconAssets/chrome.png';
import tube from './iconAssets/tube.png';
import paytm from './iconAssets/paytm.png';
import phonepe from './iconAssets/phonepe.png';
import music from './iconAssets/music.png';
import chat from './iconAssets/chat.png';
export const icons = {
	phone,
	app,
	todo,
	browser,
	tube,
	music,
	paytm,
	phonepe,
	chat
};

const pureBlack = '#000000';
const pureWhite = '#ffffff';
const background = '#191E22';
const textColor = pureWhite;
const lightF2 = '#242424';
const borderColor = '#c7c7c7';
const backgroundB4 = `${background}b4`;
export const colors = {
	backgroundB4,
	background,
	borderColor,
	textColor,
	pureBlack,
	pureWhite,
	lightF2,
};

export const fontSize = {
	h3: 22,
	h4: 16,
	h42: 14,
	h5: 12,
	h6: 10
};

export const fontFamily = {
	light: 'sans-serif-light',
	medium: 'sans-serif-medium',
	regular: 'sans-serif',
};

const themes = {
	fontFamily,
	fontSize,
	colors,
	icons,
};

export default themes;
