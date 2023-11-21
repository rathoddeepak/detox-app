// Written By Deepak Rathod 21 May 2023
// While Feeling Exhausted
import React, {Component} from 'react';

//React Native Components
import {
	View,
	StyleSheet,
	Modal,
	Image,
	Animated,
	Text,
	TouchableOpacity,
} from 'react-native';

//Custom Components
import ProgressBar from 'components/ProgressBar';
import DateManager from 'components/DateManager';
import UtilityManager from 'components/UtilityManager';
//Helper Constants
import helper from 'utils/helper';
import themes from 'themes';
import moment from 'moment';
import QuoteBackend from 'backend/qoute';

const defaultQuote = 'Not Stopping here...';
const defaultAuthor = 'Deepak Rathod';
const itemSize = 80;
const containerSize = 120;

const imageHeight = helper.width / 1.7756097561;
class FocusHolder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dayProgress: 0,
			qoute: defaultQuote,
			qouteAuhtor: defaultAuthor,
			scrollY: new Animated.Value(1),
			showImage: false,
			animatedWidth: new Animated.Value(helper.width),
		};
		this.navigationFocus = null;
		this.navigationBlur = null;
	}

	loadQuote = async () => {
		this.setState({qoute: defaultQuote, qouteAuthor: defaultAuthor});
		const qouteData = await QuoteBackend.get();
		if (qouteData?.length > 0) {
			this.setState({
				qoute: qouteData[0].content,
				qouteAuthor: qouteData[0].author,
			});
		}
	};

	render() {
		return (
			<View style={[styles.main, {backgroundColor: themes.colors.background }]}>
				<View style={styles.headerCover}>
					<Image
						resizeMode="contain"
						style={styles.headerImage}
						source={{
							uri: 'https://c4.wallpaperflare.com/wallpaper/778/639/660/animals-firewatch-forest-minimalism-wallpaper-preview.jpg',
						}}
					/>
				</View>
				<View style={styles.content}>
					<DateManager />
					<UtilityManager nav={this.props.nav} />					
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
	content: {
		padding: '5%',
		flex: 1,
	},
	list: {flex: 1, justifyContent: 'center'},
	qouteCover: {
		height: 120,
		justifyContent: 'center',
		marginTop: 20,
		width: '100%',
	},
	task: {
		backgroundColor: '#262D34',
		height: 80,
		marginBottom: 10,
		borderRadius: 10,
		padding: 10,
		width: '93%',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: themes.colors.borderColor,
	},
	qoute: {
		fontFamily: 'times',
		color: themes.colors.borderColor,
		fontSize: 15,
		width: '100%',
		textAlign: 'center',
	},
	qouteAuthor: {
		fontSize: themes.fontSize.h4,
	},
	headerCover: {
		height: imageHeight,
		width: '100%',
	},
	headerImage: {
		height: imageHeight,
		width: '100%',
	},
});

export default FocusHolder;
