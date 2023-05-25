import phone from './iconAssets/phone.png';
import app from './iconAssets/app.png';
export const icons = {
	phone,
	app,
};

const pureBlack = '#000000';
const pureWhite = '#ffffff';
const background = pureBlack;
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
