import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {useState} from "react";


export default function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    const query = encodeURIComponent(searchQuery);

    const response
        = await fetch(`https://musicbrainz.org/ws/2/artist/?query=${query}&fmt=json&limit=1&inc=releases`,

        {
          headers: {
            'User-Agent': 'MyApp/1.0.0 (alexandrcuranov@gmail.com)'
          }
        }

        );

    if (!response.ok) {
      console.log('Error');
      return;
    }

    const data = await response.json();
    // Extract the first artist from the response
    const artist = data.artists[0];

    if (artist) {
      const artistId = artist.id;

      const releaseResponse = await fetch(
          `https://musicbrainz.org/ws/2/release?artist=${artistId}&fmt=json&limit=100`,
          {
            headers: {
              'User-Agent': 'MyApp/1.0.0 (alexandrcuranov@gmail.com)',
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
    } else {
      console.log('No artist found');
    }
  };

  const renderAlbums = () => {
    return albums.map((album, index) => (
        <Text key={index} style={styles.albumText}>{album.title}</Text>
    ));
  };

  return (
    <View style={styles.author}>
      <Text style={styles.boldText}>
        <Text>Hello World!{'\n'}</Text>
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
    marginTop: 100,
  },
  albumsContainer: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
  },
  albumText: {
    fontSize: 16,
    marginBottom: 10,
  },

});
