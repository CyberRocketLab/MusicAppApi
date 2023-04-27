import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {useState} from "react";


export default function App() {

    const [searchQuery, setSearchQuery] = useState('');
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState('');

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

                    setAlbums(releases || []);
                }, 1000); // 1-second delay
            } else {
                console.log('No artist found');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };


    const renderAlbums = () => {
        return albums.map((album, index) => (
            <View key={index} style={styles.albumContainer}>
                <Text style={styles.albumTitle}>{album.title}</Text>
                <Text style={styles.albumYear}>Year: {album.date ? album.date.slice(0,4) : 'unknown'}</Text>
                <Text style={styles.albumType}>Type: {album['primary-type']}</Text>
            </View>
        ));
    };

    return (
        <View style={styles.author}>
            <Text style={styles.boldText}>
                <Text>Alexandr Curanov{'\n'}</Text>
                <Text>12029720</Text>
            </Text>


            <View style={styles.searchContainer}>

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

            <ScrollView contentContainerStyle={styles.albumsContainer}>
                {renderAlbums()}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    author: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

    }, boldText: {
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 30,
        margin: 60

    }, title: {
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
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 150,
    },
    albumsContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    albumText: {
        fontSize: 16,
        marginBottom: 10,
    },
    albumContainer: {
        width: 300,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    albumTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    albumYear: {
        fontSize: 16,
        marginBottom: 5,
    },
    albumType: {
        fontSize: 16,
    },

});
