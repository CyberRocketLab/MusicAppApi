import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from "react-native-safe-area-context";
enableScreens();

import ResultsScreen from './ResultsScreen';
import SearchScreen from './SearchScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <GestureHandlerRootView  style={{ flex: 1 }}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={SearchScreen} />
                        <Stack.Screen name="Results" component={ResultsScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>

    );
}
