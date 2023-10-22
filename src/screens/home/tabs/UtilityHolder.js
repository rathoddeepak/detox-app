// Written By Deepak Rathod 21 May 2023
// While Feeling Exhausted
import React, {Component} from 'react';

//React Native Components
import {View, StyleSheet, Pressable, Text, Animated} from 'react-native';

//Custom Components
import LeetCode from 'components/LeetCode';

//Helper Constants
import helper from 'utils/helper';

class UtilityHolder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dayProgress: 0,
			showImage: false,
			animatedWidth: new Animated.Value(helper.height),
		};
		this.navigationFocus = null;
		this.navigationBlur = null;
	}

	componentDidMount() {}

	componentWillUnmount() {}

	handleTimeChnage = currentMoment => {};

	showSabkaContent = content => {
		this.props.nav.navigate('SabkaCollege', content);
	};

	viewThaught = thought => {
		this.props.nav.navigate('Thought', {
			thought,
		});
	};

	renderFooter = () => {
		return (
			<>
				<Pressable
					onPress={() => this.viewThaught('cr')}
					style={styles.sabkaHolder}>
					<Text style={styles.sabkaText}>Energy</Text>
				</Pressable>

				<Pressable
					onPress={() => this.viewThaught('cm')}
					style={styles.sabkaHolder}>
					<Text style={styles.sabkaText}>Mind</Text>
				</Pressable>

				<Pressable
					onPress={() =>
						this.showSabkaContent({
							type: 'JAVA',
							title: 'Java DSA',
						})
					}
					style={styles.sabkaHolder}>
					<Text style={styles.sabkaText}>Sabka College | JAVA</Text>
				</Pressable>

				<Pressable
					onPress={() =>
						this.showSabkaContent({
							type: 'WEB',
							title: 'Full Stack',
						})
					}
					style={styles.sabkaHolder}>
					<Text style={styles.sabkaText}>Sabka College | WEB</Text>
				</Pressable>
			</>
		);
	};

	render() {
		const {showImage, animatedWidth, currentImage} = this.state;
		return (
			<View style={styles.main}>
				<View style={styles.content}>
					<LeetCode footerComponent={this.renderFooter} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		height: helper.height,
		width: helper.width,
	},
	content: {
		padding: '5%',
		flex: 1,
		marginTop: 30,
	},
	sabkaHolder: {
		height: 50,
		justifyContent: 'center',
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderColor: '#242424',
		marginTop: 20,
	},
	sabkaText: {
		fontSize: 15,
		color: '#c7c7c7',
	},
});

export default UtilityHolder;