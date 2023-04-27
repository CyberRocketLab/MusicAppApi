import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SearchScreen from './SearchScreen';
import ResultsScreen from './ResultsScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="Results" component={ResultsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    author: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    boldText: {
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 30,
        margin: 60,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: 200,
        height: 40,
        fontSize: 16,
        margin: 5,
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 100,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
