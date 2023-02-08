import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../scripts/constants';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export const Header = ({ navigation }) => {
    const [image, setImage] = useState(null);

    return (
        <View style={styles.header}>
            <Image
                source={require('../assets/Logo.png')}
                style={{
                    resizeMode: 'stretch',
                    height: 40,
                    width: 200
                }}
            />
            <TouchableOpacity
                onPress={() => navigation?.navigate('Profile')}
                style={styles.avatar}>
                {image && <Image source={{ uri: image }}
                    style={{
                        ...styles.avatar,
                    }} />}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 2 / 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20
    },
    avatar: {
        backgroundColor: '#495E',
        height: 50,
        width: 50,
        borderRadius: 50,
        right: responsiveWidth(2),
        position: 'absolute'

    },
});
