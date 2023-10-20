import React, {useState, useMemo} from 'react';
import {View, Pressable, Text, FlatList, ToastAndroid} from 'react-native';
import courseData from './course.json';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
const ApnaCollege = ({navigation}) => {
	const courses = useMemo(() => {
		const course = courseData.course;
		const sectionMap = course.sections;
		const sectionKeys = Object.keys(course.sections);
		const videos = courseData.course.videos;
		const objects = courseData.course.objects;
		const sections = sectionKeys.map(key => {
			const section = sectionMap[key];
			const data = [];
			(section.learningPath || []).forEach(path => {
				if (path.type === 'ivideo' && videos[path.id]) {
					data.push(videos[path.id]);
				} else if (objects[path.id]) {
					data.push(objects[path.id]);
				}
			});
			section.id = key;
			section.data = data || [];
			return section;
		});
		return sections;
	}, []);
	const [toggleMap, setToggleMap] = useState({});
	const [resetList, setResetList] = useState(false);

	const viewPath = source => {
		if (source.objectType === 'ivideo') {
			const id = source.sourceid;
			const playerUrl = `https://fast.wistia.com/embed/medias/${id}.m3u8`;
			navigation.navigate('SabkaPlayer', {
				uri: playerUrl,
				...source,
			});
		} else {
			ToastAndroid.show('Only Video Supported Currently', ToastAndroid.SHORT);
		}
	};

	const togglePath = id => {
		if (toggleMap[id]) {
			delete toggleMap[id];
		} else {
			toggleMap[id] = true;
		}
		setToggleMap(toggleMap);
		setResetList(!resetList);
	};

	const handleExit = () => {
		navigation.goBack();
	};

	const renderCard = ({item}) => {
		const isOpen = toggleMap[item.id];
		return (
			<View>
				<Pressable style={style.card} onPress={() => togglePath(item.id)}>
					<Text style={style.cardText}>{item.title}</Text>
					<View style={style.arrowCover}>
						<Text style={style.arrow}>{isOpen ? '-' : '+'}</Text>
					</View>
				</Pressable>
				{isOpen
					? item.data.map(path => (
							<Pressable
								key={path.id}
								onPress={() => viewPath(path)}
								style={style.pathCover}>
								<Text style={style.pathText}>{path.title}</Text>
							</Pressable>
							))
					: null}
			</View>
		);
	};

	return (
		<View style={style.main}>
			<OrientationLocker orientation={PORTRAIT} />
			<View style={style.header}>
				<Text style={style.headerText}>Sabka College 3.0 | Java</Text>
				<Text onPress={handleExit} style={style.closeText}>Exit</Text>
			</View>
			<FlatList refresh={!resetList} renderItem={renderCard} data={courses} />
		</View>
	);
};

const style = {
	main: {
		backgroundColor: '#000000',
		flex: 1,
		paddingTop: 25,
	},
	header: {
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 50,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderColor: '#242424',
		flexDirection: 'row',
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#c7c7c7',
	},
	closeText: {
		fontWeight: 'bold',
		fontSize: 15,
		color: '#c7c7c7',
	},
	card: {
		height: 50,
		paddingHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	cardText: {
		fontSize: 16,
		color: '#c7c7c7',
		fontWeight: '500',
	},
	arrowCover: {
		width: 25,
		height: 25,
		justifyContent: 'center',
	},
	arrow: {
		fontSize: 15,
		color: '#c7c7c7',
	},
	pathCover: {
		height: 40,
		justifyContent: 'center',
		backgroundColor: '#242424',
		borderBottomWidth: 1,
		borderColor: '#000000',
		paddingHorizontal: 10,
	},
	pathText: {
		fontSize: 13,
		color: '#c7c7c7',
	},
};

export default ApnaCollege;