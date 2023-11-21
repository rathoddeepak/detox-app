import React from 'react';
import {View} from 'react-native';
import {colors} from 'themes';
const ProgressBar = props => {
	const {
		top,
		left,
		bottom,
		right,
		progress,
		barHeight,
		borderRadius,
		width,
		filledColor,
		unfilledColor,
	} = props;
	const fillWidth = `${progress}%`;
	const unfilllStyles = {
		width,
		overflow: 'hidden',
		backgroundColor: unfilledColor,
		height: barHeight,
		marginTop: top,
		borderRadius,
		marginLeft: left,
		marginBottom: bottom,
		marginRight: right,
	};
	const filledStyles = {
		width: fillWidth,
		height: barHeight,
		backgroundColor: filledColor,
	};
	return (
		<View style={unfilllStyles}>
			<View style={filledStyles} />
		</View>
	);
};

ProgressBar.defaultProps = {
	barHeight: 8,
	borderRadius: 2,
	width: '100%',
	progress: 0,
	filledColor: colors.foreground,
	unfilledColor: colors.foregroundLight,
	left: 0,
	top: 0,
	bottom: 0,
	right: 0,
};

export default ProgressBar;
