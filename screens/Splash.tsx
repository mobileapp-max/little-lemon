import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function Splash() {

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/Logo.png')}
                style={{ resizeMode: 'stretch', height: 50, width: 250 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
