import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import ResultsScreen from './ResultsScreen';
import SearchScreen from './SearchScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={SearchScreen} />
                <Stack.Screen name="Results" component={ResultsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
