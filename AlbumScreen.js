import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const AlbumsScreen = ({ route }) => {
    const { albums } = route.params;

    const renderAlbums = () => {
        return albums.map((album, index) => (
            <Text key={index} style={styles.albumText}>{album.title}</Text>
        ));
    };

    return (
        <View style={styles.albumsContainer}>
            <ScrollView contentContainerStyle={styles.albumsContentContainer}>
                {renderAlbums()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    albumsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    albumsContentContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    albumText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default AlbumsScreen;
