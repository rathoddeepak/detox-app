import React, {Component} from 'react';

//React Native Components
import {
	View,
	StyleSheet,
	Modal,
	Image,
	ScrollView,
	Text,
	Pressable,
} from 'react-native';

//Custom Components
import {Calendar} from 'react-native-calendars';
import Calculator from './calculator';
import Todo from './todo';

//Helper Constants
import themes from 'themes';

const tabs = [
	{
		name: 'Todo',
	},
	{
		name: 'Calender',
	},
	{
		name: 'Calculator',
	},
	{
		name: 'Other',
	},
];
class UtilityManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 0,
			tasks: [],
		};
	}

	renderTabs = (tab, idx) => {
		const sIdx = this.state.selectedTab;
		const isSelected = sIdx === idx;
		const bgColor = isSelected
			? themes.colors.foregroundLight
			: themes.colors.background;
		const color = isSelected
			? themes.colors.foreground
			: themes.colors.foregroundLight;
		return (
			<Pressable
				onPress={() =>
					this.setState({
						selectedTab: idx,
					})
				}
				key={idx}
				style={[styles.tab, {backgroundColor: bgColor}]}>
				<Text style={[styles.tabText, {color}]}>{tab.name}</Text>
			</Pressable>
		);
	};

	showSabkaContent = content => {
		this.props.nav.navigate('SabkaCollege', content);
	};

	viewThaught = thought => {
		this.props.nav.navigate('Thought', {
			thought,
		});
	};

	showTimer = () => {
		this.props.nav.navigate('TimeUntil');
	};

	renderContent = () => {
		switch (this.state.selectedTab) {
			case 0:
				return <Todo />;
			case 1:
				return (
					<Calendar
						style={{
							backgroundColor: themes.colors.background,
						}}
						theme={{
							backgroundColor: themes.colors.background,
							calendarBackground: themes.colors.background,
							textSectionTitleColor: themes.colors.foreground,
							monthTextColor: themes.colors.foreground,
							arrowColor: themes.colors.foreground,
							selectedDayTextColor: '#ffffff',
							todayTextColor: themes.colors.foreground,
							dayTextColor: themes.colors.foregroundLight,
							textDisabledColor: themes.colors.background,
						}}
					/>
				);
			case 2:
				return <Calculator />;
			case 3:
				return (
					<>
						<Pressable
							style={styles.rowItem}
							onPress={() =>
								this.showSabkaContent({
									type: 'JAVA',
									title: 'Java DSA',
								})
							}>
							<Text style={styles.rowTxt}>Sabka College | JAVA</Text>
						</Pressable>
						<Pressable
							style={styles.rowItem}
							onPress={() =>
								this.showSabkaContent({
									type: 'WEB',
									title: 'Full Stack',
								})
							}>
							<Text style={styles.rowTxt}>Sabka College | WEB</Text>
						</Pressable>
						<Pressable style={styles.rowItem} onPress={this.showTimer}>
							<Text style={styles.rowTxt}>Time until</Text>
						</Pressable>
						<Pressable
							style={styles.rowItem}
							onPress={() => this.viewThaught('cr')}>
							<Text style={styles.rowTxt}>Energy</Text>
						</Pressable>
						<Pressable
							style={styles.rowItem}
							onPress={() => this.viewThaught('cm')}>
							<Text style={styles.rowTxt}>Mind</Text>
						</Pressable>
						<View style={{height: 10}} />
					</>
				);
		}
	};

	render() {
		return (
			<View style={styles.main}>
				<ScrollView horizontal>{tabs.map(this.renderTabs)}</ScrollView>
				{this.renderContent()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		borderRadius: 10,
		borderWidth: 1,
		minHeight: 80,
		marginTop: 20,
		padding: 10,
		borderColor: themes.colors.foregroundLight,
	},
	tab: {
		borderRadius: 5,
		paddingHorizontal: 10,
		height: 25,
		marginRight: 10,
	},
	tabText: {
		fontSize: themes.fontSize.h4,
		fontWeight: '500',
	},
	calculator: {
		height: 200,
		width: '100%',
	},
	rowItem: {
		height: 45,
	},
	rowTxt: {
		color: themes.colors.foreground,
		fontSize: themes.fontSize.h4,
		fontWeight: 'bold',
		marginTop: 20,
	},
});

export default UtilityManager;