import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

export default function ResultsScreen({ route }) {
    const { albums } = route.params;

    if (!albums) {
        return null;
    }

    const renderAlbums = () => {
        const albumPairs = [];
        for (let i = 0; i < albums.length; i += 2) {
            const albumPair = [albums[i]];
            if (i + 1 < albums.length) {
                albumPair.push(albums[i + 1]);
            }
            albumPairs.push(albumPair);
        }

        return albumPairs.map((albumPair, index) => (
            <View key={index} style={styles.albumPairContainer}>
                {albumPair.map((album, index) => (
                    <View key={index} style={styles.albumContainer}>
                        <View style={styles.albumImageContainer}>
                            {album['cover-art-archive'] && album['cover-art-archive'].front ? (
                                <Image
                                    source={{ uri: `https://coverartarchive.org/release/${album.id}/front` }}
                                    style={styles.albumImage}
                                />
                            ) : (
                                <View style={styles.albumImagePlaceholder}>
                                    <Text style={styles.albumImageText}>No image available</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.albumInfoContainer}>
                            <Text style={styles.albumTitle}>{album.title}</Text>
                            <Text style={styles.albumYear}>Year: {album.date ? album.date.slice(0, 4) : 'unknown'}</Text>
                            <Text style={styles.albumType}>Type: {album['primary-type'] || 'Album'}</Text>
                        </View>
                    </View>
                ))}
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.albumsContainer} horizontal={false}>
                {renderAlbums()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    albumsContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        display: 'flex',
    },
    albumPairContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    albumContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 5,
        borderRadius: 10,
        overflow: 'hidden',
        width: '47%',
        height: 280,
        elevation: 5,
    },
    albumImageContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    albumImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    albumImagePlaceholder: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
    },
    albumImageText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    albumInfoContainer: {
        flex: 1,
        padding: 10,
    },
    albumTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    albumYear: {
        fontSize: 14,
        marginBottom: 5,
    },
    albumType: {
        fontSize: 14,
        marginBottom: 5,
    },
});
