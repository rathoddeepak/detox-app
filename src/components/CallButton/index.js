import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {colors, icons} from 'themes';
import RNInstalledApplication from 'libs/AppManager';

const CallButton = props => {
	const {size, top, left, right, bottom} = props;
	const handleContact = () => {
		try {
			RNInstalledApplication.startAppByPackageName('com.android.contacts');
		} catch (err) {}
	};
	const iconSize = size - size * 0.3;
	const coverStyle = {
		position: 'absolute',
		top,
		right,
		left,
		bottom,
		width: size,
		height: size,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.textColor,
	};
	const iconStyle = {
		width: iconSize,
		height: iconSize,
		tintColor: colors.background,
	};
	return (
		<TouchableOpacity onPress={handleContact} style={coverStyle}>
			<Image source={icons.phone} style={iconStyle} />
		</TouchableOpacity>
	);
};

CallButton.defaultProps = {
	size: 40,
};

export default CallButton;
