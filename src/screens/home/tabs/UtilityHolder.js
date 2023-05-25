// Written By Deepak Rathod 21 May 2023
// While Feeling Exhausted
import React, {Component} from 'react';

//React Native Components
import {View, StyleSheet} from 'react-native';

//Custom Components
import LeetCode from 'components/LeetCode';

//Helper Constants
import helper from 'utils/helper';

class UtilityHolder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dayProgress: 0,
		};
		this.navigationFocus = null;
		this.navigationBlur = null;
	}

	componentDidMount() {}

	componentWillUnmount() {}

	handleTimeChnage = currentMoment => {};

	render() {
		const {appList} = this.state;
		return (
			<View style={styles.main}>
				<View style={styles.content}>
					<LeetCode />
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
	},
});

export default UtilityHolder;
