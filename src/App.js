// In App.js in a new project

import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SabkaCollege from './screens/apnaCollege/';
import SabkaPlayer from './screens/apnaCollege/player';
import Thought from './screens/thoughts';
import TimeUntil from './screens/timeuntil';
import HomeScreen from 'screens/home';
import themes from 'themes';

const Stack = createNativeStackNavigator();

function App() {
	StatusBar.setBackgroundColor('transparent');
	StatusBar.setBarStyle('light-content');
	StatusBar.setTranslucent(true);
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Thought" component={Thought} />
				<Stack.Screen name="SabkaCollege" component={SabkaCollege} />
				<Stack.Screen name="SabkaPlayer" component={SabkaPlayer} />
				<Stack.Screen name="TimeUntil" component={TimeUntil} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
