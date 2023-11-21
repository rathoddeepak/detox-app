import phone from './iconAssets/phone.png';
import app from './iconAssets/app.png';
import todo from './iconAssets/todo.png';
import browser from './iconAssets/chrome.png';
import tube from './iconAssets/tube.png';
import paytm from './iconAssets/paytm.png';
import phonepe from './iconAssets/phonepe.png';
import music from './iconAssets/music.png';
import chat from './iconAssets/chat.png';
import msg from './iconAssets/msg.png';

export const icons = {
	phone,
	app,
	todo,
	browser,
	tube,
	music,
	paytm,
	phonepe,
	chat,
	msg
};

const pureBlack = '#000000';
const pureWhite = '#ffffff';
const background = '#0A0B1E';
const foreground = '#757BFF';
const foregroundLight = '#2E316E';
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
	foregroundLight,
	foreground,
};

export const fontSize = {
	h1: 30,
	h2: 26,
	h3: 22,
	h4: 16,
	h42: 14,
	h5: 12,
	h6: 10,
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