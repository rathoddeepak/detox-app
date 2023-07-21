import React, {useRef} from 'react';
import {
	Animated,
	View,
	StyleSheet,
	PanResponder,
	Vibration,
	Image,
} from 'react-native';
import themes from 'themes';
import helper from 'utils/helper';
import Apps from './apps';
import AppManager from 'libs/AppManager';
import TodoAdder from '../TodoAdder';

const apps = [
	{top: -60, left: -90, icon: themes.icons.phone},
	{top: -100, left: 0, icon: themes.icons.app},
	{top: -60, left: 90, icon: themes.icons.todo},
];
const halfWidth = helper.width / 2;
const captureRegion = helper.height - 100;
const getIdx = (pageX, pageY) => {
	if (pageY > captureRegion) {
		return -1;
	}
	const middleStart = halfWidth - 50;
	const middleEnd = halfWidth + 50;
	if (pageX < middleStart) {
		return 0;
	}
	if (pageX > middleEnd) {
		return 2;
	}
	return 1;
};
const Diri = () => {
	const currentApps = useRef();
	const todoAdder = useRef();
	const currentIdx = useRef(new Animated.Value(-1)).current;
	const diriScale = useRef(new Animated.Value(1)).current;
	const scales = [
		useRef(new Animated.Value(0)).current,
		useRef(new Animated.Value(0)).current,
		useRef(new Animated.Value(0)).current,
	];
	const opacities = [
		useRef(new Animated.Value(0)).current,
		useRef(new Animated.Value(0)).current,
		useRef(new Animated.Value(0)).current,
	];

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderStart: ({nativeEvent}) => {
				Animated.spring(diriScale, {
					toValue: 1.05,
					useNativeDriver: true,
				}).start();
				toggle(1);
				Vibration.vibrate(50);
				return true;
			},
			onPanResponderMove: ({nativeEvent}) => {
				const idx = getIdx(nativeEvent.pageX, nativeEvent.pageY);
				if (idx !== currentIdx._value) {
					currentIdx.setValue(idx);
					updateIdx(idx);
				}
			},
			onPanResponderRelease: () => {
				const appIdx = currentIdx._value;
				Animated.spring(diriScale, {
					toValue: 1,
					useNativeDriver: true,
				}).start();
				currentIdx.setValue(-1);
				updateIdx(-1);

				setTimeout(() => {
					toggle(0);
				}, 300);

				setTimeout(() => {
					openApp(appIdx);
				}, 500);
			},
		}),
	).current;

	const updateIdx = idx => {
		Animated.parallel([
			Animated.spring(scales[0], {
				toValue: idx === 0 ? 1.5 : 1,
				useNativeDriver: false,
			}),
			Animated.spring(scales[1], {
				toValue: idx === 1 ? 1.5 : 1,
				useNativeDriver: false,
			}),
			Animated.spring(scales[2], {
				toValue: idx === 2 ? 1.5 : 1,
				useNativeDriver: false,
			}),
		]).start();
	};

	const toggle = (v = 0) => {
		Animated.parallel([
			Animated.spring(opacities[0], {
				toValue: v,
				useNativeDriver: false,
			}),
			Animated.spring(opacities[1], {
				toValue: v,
				useNativeDriver: false,
			}),
			Animated.spring(opacities[2], {
				toValue: v,
				useNativeDriver: false,
			}),

			Animated.spring(scales[0], {
				toValue: v,
				useNativeDriver: false,
			}),
			Animated.spring(scales[1], {
				toValue: v,
				useNativeDriver: false,
			}),
			Animated.spring(scales[2], {
				toValue: v,
				useNativeDriver: false,
			}),
		]).start();
	};

	const openApp = idx => {
		if (idx === 1) {
			currentApps.current.show();
		} else if (idx === 0) {
			AppManager.startAppByPackageName('com.android.contacts');
		} else if (idx === 2) {
			todoAdder.current.show();
		}
	};

	const renderApps = (app, idx) => (
		<Animated.View
			style={[
				styles.button,
				{
					left: app.left,
					top: app.top,
					opacity: opacities[idx],
					transform: [
						{
							scale: scales[idx],
						},
					],
				},
			]}>
			<Image source={app.icon} style={styles.icon} />
		</Animated.View>
	);

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					{
						transform: [
							{
								scale: diriScale,
							},
						],
					},
					styles.box,
				]}
				{...panResponder.panHandlers}>
				{apps.map(renderApps)}
			</Animated.View>
			<Apps ref={currentApps} />
			<TodoAdder ref={todoAdder} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 200,
		width: 300,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleText: {
		fontSize: 14,
		lineHeight: 24,
		fontWeight: 'bold',
	},
	box: {
		height: 50,
		width: 50,
		borderRadius: 100,
		top: 40,
		borderWidth: 5,
		borderColor: themes.colors.borderColor,
	},
	button: {
		borderRadius: 100,
		height: 40,
		width: 40,
		position: 'absolute',
		backgroundColor: themes.colors.borderColor,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: 25,
		height: 25,
		tintColor: themes.colors.background,
	},
});

export default Diri;