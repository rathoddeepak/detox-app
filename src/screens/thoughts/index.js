import React from 'react';
import {
	View,
	Pressable,
	Text,
	ScrollView,
	StyleSheet,
	Image,
} from 'react-native';
import themes from 'themes';
import helper from 'utils/helper';

const cr = [
	'https://i.postimg.cc/tJr0XrxB/cr1.jpg',
	'https://i.postimg.cc/x817FK4M/cr2.jpg',
	'https://i.postimg.cc/GpvZB3D8/cr3.jpg',
	'https://i.postimg.cc/ZnsgkCGg/cr4.jpg',
	'https://i.postimg.cc/G2r6v0PM/cr5.jpg',
	'https://i.postimg.cc/bJTWT63q/cr6.jpg',
];

const cm = [
	'https://i.postimg.cc/1tQ46zYL/cm1.jpg',
	'https://i.postimg.cc/Wzf29pXp/cm2.jpg',
	'https://i.postimg.cc/kXBM28g2/cm3.jpg',
	'https://i.postimg.cc/NMDGHkXH/cm4.jpg',
	'https://i.postimg.cc/jq8dqvtV/cm5.jpg',
	'https://i.postimg.cc/3wgxKTJ9/cm6.jpg',
	'https://i.postimg.cc/8cCpBfdn/cm7.jpg',
	'https://i.postimg.cc/VLpfn6JD/cm8.jpg',
	'https://i.postimg.cc/50bNyRXJ/cm9.jpg',
	'https://i.postimg.cc/RZtMRBf9/cm10.jpg',
	'https://i.postimg.cc/XqhbfHYp/cm11.jpg',
	'https://i.postimg.cc/hj2gjPF8/cm12.jpg',
	'https://i.postimg.cc/76HwwJRY/cm13.jpg',
	'https://i.postimg.cc/zfS8sF0c/cm14.jpg',
	'https://i.postimg.cc/MHXwj2xC/cm15.jpg',
];

const of = [
	'https://i.postimg.cc/KY40pzWV/of1.png',
	'https://i.postimg.cc/bwm6Rbmk/of2.png',
];

const getData = t => {
	switch (t) {
		case 'cm':
			return cm;
		case 'cr':
			return cr;
		default:
			return of;
	}
};

const Thaughts = ({route, navigation}) => {
	const thought = route.params?.thought || 'cm';
	const data = getData(thought);

	const renderThaught = (uri, index) => {
		return (
			<Image
				resizeMode="contain"
				key={index}
				style={styles.image}
				source={{uri}}
			/>
		);
	};

	return (
		<View style={styles.main}>
			<Pressable onPress={() => navigation.goBack()} style={styles.backCover}>
				<Text style={styles.backButton}>EXIT</Text>
			</Pressable>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				decelerationRate={0.9}
				overScrollMode="never"
				showsScrollIndicator={false}
				disableIntervalMomentum={true}
				snapToInterval={helper.width}>
				{data.map(renderThaught)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		height: helper.height,
		width: helper.width,
		backgroundColor: themes.colors.background,
	},
	image: {
		height: helper.height,
		width: helper.width,
	},
	backCover: {
		position: 'absolute',
		top: 50,
		right: 20,
		zIndex: 100,
	},
	backButton: {
		color: themes.colors.textColor,
		fontSize: 25,
		fontWeight: 'bold',
	},
});

export default Thaughts;