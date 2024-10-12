import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	isMountedRef,
	navigationRef,
} from 'services/navigation/NavigationService';

import { palettes } from 'common/theme';

import HomeScreen from 'features/home/Home';

export type RootStackParamsList = {
	Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const Navigator = () => {
	/**
	 * Hide the splash screen on mount
	 * Keep track of nav container mounts for usage of {@link NavigationService}
	 */
	useEffect(() => {
		isMountedRef.current = true;
		// SplashScreen.hide({ duration: 250 })
		return () => {
			isMountedRef.current = false;
		};
	}, []);
	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ title: 'Trending Repos' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
