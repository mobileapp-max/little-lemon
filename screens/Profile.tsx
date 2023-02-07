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

export default function Profile() {

    const [storage, setStorage] = useState({})
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        last_name: '',
        email: '',
        phone_number: '',
        check_textInputChange: 'null',
        check_email: 'null',
        order_status: false,
        password_changes: false,
        special_offers: false,
        newsletters: false
    });

    const storeData = async () => {
        try {
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem('profileData', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('profileData')
            setData(jsonValue != null ? JSON.parse(jsonValue) : null)
        } catch (e) { }
    }
    useEffect(() => {
        getData()
        console.log(data)
    }, []);

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                name: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                name: val,
                check_textInputChange: false
            });
        }
    }
    const textLastNameInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                last_name: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                last_name: val,
                check_textInputChange: false
            });
        }
    }

    const handleEmailChange = (val) => {
        if (val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setData({
                ...data,
                email: val,
                check_email: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_email: false
            })
        }
    }

    const phoneInputChange = (val) => {
        setData({
            ...data,
            phone_number: val,
        });
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        left: 27,
                        top: 63
                    }}>
                    <AntDesign
                        name="leftcircle"
                        size={35}
                        color="#495E57"
                    />
                </TouchableOpacity>
                <Image
                    source={require('../assets/Logo.png')}
                    style={{
                        resizeMode: 'stretch',
                        height: 40,
                        width: 200
                    }}
                />
            </View>
            <View style={styles.footer}>
                <Text style={{ ...styles.title, marginTop: 15 }}>
                    {'Personal Informaiton'}
                </Text>
                <View>
                    <View>
                        <View style={styles.avatarSection}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                                <Text style={{ marginBottom: 2 }}>
                                    {'Avatar'}
                                </Text>
                                <View style={styles.avatar}>
                                    {image && <Image source={{ uri: image }}
                                        style={{
                                            ...styles.avatar, marginHorizontal: 0
                                        }} />}
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={pickImage}
                                style={{ ...styles.button, marginLeft: 0, backgroundColor: '#495E57' }}
                            >
                                <Text style={{ ...styles.text, color: 'white' }}>{'Change'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setImage(null)}
                                style={{ ...styles.button, margin: 0, backgroundColor: 'white', borderWidth: 1, borderColor: "#495E57" }}
                            >
                                <Text style={styles.text}>{'Remove'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.textInputTitles}>{'First Name'}</Text>
                        <TextInput
                            value={data.name}
                            onChangeText={(val) => textInputChange(val)}
                            // placeholder="Type your Name"
                            style={styles.textInput} />
                        <Text style={styles.textInputTitles}>{'Last Name'}</Text>
                        <TextInput
                            value={data.last_name}
                            onChangeText={(val) => textLastNameInputChange(val)}
                            placeholder="Type your Last Name"
                            style={styles.textInput} />
                        <Text style={styles.textInputTitles}>{'Email'}</Text>
                        <TextInput
                            value={data.email}
                            onChangeText={(val) => handleEmailChange(val)}
                            placeholder="Type your Email"
                            style={styles.textInput} />
                        <Text style={styles.textInputTitles}>{'Phone Nuber'}</Text>
                        <MaskedTextInput
                            value={data.phone_number}
                            mask="999-999-9999"
                            onChangeText={(val) => phoneInputChange(val)}
                            placeholder="Type your Phone"
                            style={styles.textInput} />
                        <Text style={styles.title}>
                            {'Email Notifications'}
                        </Text>
                        <View style={styles.checkBoxes}>
                            <BouncyCheckbox
                                isChecked={data.order_status}
                                size={25}
                                fillColor="#495E57"
                                unfillColor="#FFFFFF"
                                innerIconStyle={{ borderWidth: 2 }}
                                onPress={(isChecked: boolean) => setData({ ...data, order_status: isChecked })}
                            />
                            <Text>{'Order Statuses'}</Text>
                        </View>
                        <View style={styles.checkBoxes}>
                            <BouncyCheckbox
                                isChecked={data.password_changes}
                                size={25}
                                fillColor="#495E57"
                                unfillColor="#FFFFFF"
                                innerIconStyle={{ borderWidth: 2 }}
                                onPress={(isChecked: boolean) => setData({ ...data, password_changes: isChecked })}
                            />
                            <Text>{'Password Changes'}</Text>
                        </View>
                        <View style={styles.checkBoxes}>
                            <BouncyCheckbox
                                isChecked={data.special_offers}
                                size={25}
                                fillColor="#495E57"
                                unfillColor="#FFFFFF"
                                innerIconStyle={{ borderWidth: 2 }}
                                onPress={(isChecked: boolean) => setData({ ...data, special_offers: isChecked })}
                            />
                            <Text>{'Special Offers'}</Text>
                        </View>
                        <View style={styles.checkBoxes}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="#495E57"
                                unfillColor="#FFFFFF"
                                innerIconStyle={{ borderWidth: 2 }}
                                onPress={(isChecked: boolean) => setData({ ...data, newsletters: isChecked })}

                            />
                            <Text>{'Newsletters'}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => console.log(getData())}
                            style={{ ...styles.button, backgroundColor: '#F4CE14', width: responsiveWidth(85), marginBottom: responsiveHeight(0.5) }}
                        >
                            <Text style={styles.text}>{'Log Out'}</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => { }}
                                style={{ ...styles.button, borderColor: '#F4CE14', width: responsiveWidth(40), backgroundColor: 'white', borderWidth: 1 }}
                            >
                                <Text style={styles.text}>{'Discrad Changes'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={storeData}
                                style={{ ...styles.button, backgroundColor: '#495E57', width: responsiveWidth(40), }}
                            >
                                <Text style={{ ...styles.text, color: 'white' }}>{'Save Changes'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 2.5 / 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    footer: {
        flex: 18 / 20,
        margin: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'silver'
    },
    avatarSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        backgroundColor: '#495E',
        height: 70,
        width: 70,
        borderRadius: 50,
        marginHorizontal: 20
    },
    button: {
        backgroundColor: 'blue',
        height: 40,
        width: 70,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        top: 9

    },
    textInput: {
        height: responsiveHeight(4),
        backgroundColor: 'white',
        width: responsiveWidth(85),
        borderRadius: 10,
        padding: 5,
        fontSize: 15,
        borderColor: 'grey',
        borderWidth: 1,
        alignSelf: "center",
        marginBottom: responsiveHeight(2),
        padding: 7,
    },
    textInputTitles: {
        marginLeft: responsiveHeight(2),
        marginBottom: responsiveHeight(0.5),
        fontSize: responsiveFontSize(16)
    },
    title: {
        fontSize: responsiveFontSize(17),
        fontWeight: 'bold',
        marginLeft: responsiveWidth(4),
        marginBottom: 10,
    },
    checkBoxes: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: responsiveWidth(4),
        marginVertical: responsiveHeight(0.3)
    },
    text: {
        fontWeight: 'bold'
    }
});
