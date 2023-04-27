import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = async () => {
        try {
            const query = encodeURIComponent(searchQuery);

            const response = await fetch(`https://musicbrainz.org/ws/2/artist/?query=${query}&fmt=json&limit=1`, {
                headers: {
                    'User-Agent': 'MyApp/1.0.0 (alexandr@gmail.com)',
                },
            });

            if (!response.ok) {
                console.log('Error');
                return;
            }

            const data = await response.json();
            const artist = data.artists[0];

            if (artist) {
                const artistId = artist.id;

                setTimeout(async () => {
                    const releaseResponse = await fetch(
                        `https://musicbrainz.org/ws/2/release?artist=${artistId}&fmt=json&limit=100`,
                        {
                            headers: {
                                'User-Agent': 'MyApp/1.0.0 (alexandr@gmail.com)',
                            },
                        }
                    );

                    if (!releaseResponse.ok) {
                        console.log('Error fetching releases');
                        return;
                    }

                    const releaseData = await releaseResponse.json();
                    const releases = releaseData.releases;

                    navigation.navigate('Results', { albums: releases || [] });
                }, 1000); // 1-second delay
            } else {
                console.log('No artist found');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    return (
        <View style={styles.searchContainer}>
            <Text style={styles.boldText}>
                <Text>Alexandr Curanov{'\n'}</Text>
                <Text>12029720</Text>
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Type here to search"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    boldText: {
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 30,
        margin: 60,
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
