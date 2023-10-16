import React from 'react';
import VideoPlayer from 'react-native-video-controls';
import {OrientationLocker, LANDSCAPE} from 'react-native-orientation-locker';

const SabkaPlayer = ({route, navigation}) => {
	const {uri} = route.params;
	return (
		<>
			<OrientationLocker
				orientation={LANDSCAPE}
				onChange={orientation => console.log('onChange', orientation)}
				onDeviceChange={orientation =>
					console.log('onDeviceChange', orientation)
				}
			/>
			<VideoPlayer source={{uri}} navigator={navigation} />
		</>
	);
};

export default SabkaPlayer;
