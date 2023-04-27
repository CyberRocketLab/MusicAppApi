import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [favoriteArtists, setFavoriteArtists] = useState([]);

    const handleSubmit = async () => {
        try {
            const query = encodeURIComponent(searchQuery);
            const response = await fetch(`https://musicbrainz.org/ws/2/artist/?query=${query}&fmt=json&limit=1`, {
                headers: { 'User-Agent': 'MyApp/1.0.0 (alexandr@gmail.com)' },
            });

            if (!response.ok) throw new Error('Error');

            const data = await response.json();
            const artistId = data.artists[0]?.id;

            if (artistId) {
                const releaseResponse = await fetch(`https://musicbrainz.org/ws/2/release?artist=${artistId}&fmt=json&limit=100`, {
                    headers: { 'User-Agent': 'MyApp/1.0.0 (alexandr@gmail.com)' },
                });

                if (!releaseResponse.ok) throw new Error('Error fetching releases');

                const releaseData = await releaseResponse.json();
                const releases = releaseData.releases || [];

                navigation.navigate('Results', { albums: releases });
            } else {
                console.log('No artist found');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    const handleSaveFavorite = () => {
        if (!favoriteArtists.includes(searchQuery)) {
            const query = encodeURIComponent(searchQuery);
            fetch(`https://musicbrainz.org/ws/2/artist/?query=${query}&fmt=json&limit=1`, {
                headers: { 'User-Agent': 'MyApp/1.0.0 (alexandr@gmail.com)' },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.artists && data.artists.length > 0) {
                        setFavoriteArtists([...favoriteArtists, searchQuery]);
                    } else {
                        console.log('Artist not found');
                    }
                })
                .catch(error => {
                    console.error('Error in handleSaveFavorite:', error);
                });
        }
    };

    const handleFavoritePress = (artist) => {
        setSearchQuery(artist);
        handleSubmit();
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleFavoritePress(item)}
            style={styles.favoriteArtistItem}
        >
            <Text style={styles.favoriteArtistText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Alexandr Curanov{'\n'}12029720</Text>
            <TextInput
                style={styles.input}
                placeholder="Search for an artist"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSaveFavorite}
            >
                <Text style={styles.buttonText}>Save Favorite</Text>
            </TouchableOpacity>
            {favoriteArtists.length > 0 && (
                <View style={styles.favoriteArtistsContainer}>
                    <Text style={styles.favoriteArtistsTitle}>Favorite Artists:</Text>
                    <FlatList
                        data={favoriteArtists}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        style={styles.favoriteArtistsList}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        paddingTop: 50,
    },
    heading: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 30,
        marginBottom: 100,
        textAlign: 'center',
        alignItems: 'flex-start',
    },
    input: {
        width: '80%',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: 'blue',
        width: '50%',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    favoriteArtistsContainer: {
        marginTop: 20,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    favoriteArtistsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
    },
    favoriteArtistsList: {
        alignSelf: 'stretch',
    },
    favoriteArtistItem: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    favoriteArtistText: {
        fontSize: 16,
    },

});

