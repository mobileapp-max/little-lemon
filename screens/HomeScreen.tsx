import { useEffect, useState, } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/header';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../scripts/constants';
import * as SQLite from 'expo-sqlite';
import { FontAwesome } from '@expo/vector-icons';

const db = SQLite.openDatabase('example')

export default function HomeScreen({ navigation }) {

    const [data, setData] = useState([])
    const [salad, setSalad] = useState(null)
    const menuTypes = [
        { 'category': 'Starters' },
        { 'category': 'Mains' },
        { 'category': 'Desserts' },
        { 'category': 'Drinks' },
        { 'category': 'Specials' },
    ]
    const [textInput, setTextInput] = useState('')

    // useEffect(() => {
    //     db.transaction((tx) => {
    //         tx.executeSql(
    //             'create table if not exists customers (id integer primary key not null, name text)'
    //         )
    //         tx.executeSql('insert into customers (name) values (?), (?)', [
    //             'Mark',
    //             'John',
    //         ])
    //         tx.executeSql('select * from customers', [], (_, { rows }) =>
    //             Alert.alert(JSON.stringify(rows))
    //         )
    //     })
    // }, [])


    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                // console.log(data)
            })
    }, [])

    // useEffect(() => {
    //     fetch('https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setSalad(data)
    //             console.log(data)
    //         })
    // }, [])

    const Item = ({ name, description, price }) => (
        <View style={styles.flatList}>
            <Text style={styles.title}>{name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text
                    numberOfLines={2}
                    style={styles.text}
                >
                    {description}
                </Text>
                <Image
                    source={require('../assets/Greek_salad.png')}
                    style={{
                        resizeMode: 'cover',
                        height: 80,
                        width: 80,
                    }}
                />
            </View>
            <Text style={styles.price}>{'$'}{price}</Text>
            <View style={styles.seperator} />
        </View>
    );
    const ItemTypes = ({ category }) => (
        <TouchableOpacity style={styles.button}>
            <Text style={{ ...styles.title, fontSize: responsiveFontSize(18), }}>{category}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header></Header>
            <View style={styles.hero}>
                <Text style={styles.lemonTitle}>{'Little Lemon'}</Text>
                <Text style={{ ...styles.title, color: 'white' }}>{'Chicago'}</Text>
                <Text style={{ ...styles.text, color: 'white', width: responsiveWidth(56), fontSize: responsiveFontSize(20), marginTop: 8 }}>{'We are a family owned Mediterranean restaurant, focuses on trditional recipes served with a modern twist.'}</Text>
                <Image
                    source={require('../assets/rest.webp')}
                    style={{
                        width: 150,
                        height: 150,
                        resizeMode: 'cover',
                        position: 'absolute',
                        left: responsiveWidth(59),
                        top: responsiveHeight(7),
                        borderRadius: 20
                    }}
                />
                <TextInput
                    onChangeText={(val) => setTextInput(val)}
                    style={styles.textInput}>
                    <FontAwesome
                        name="search"
                        size={20}
                        color="black"
                        style={{ justifyContent: 'center', }} />
                </TextInput>
            </View>
            <View style={styles.menu}>
                <Text style={{ fontWeight: 'bold', fontSize: responsiveWidth(4.2), margin: responsiveWidth(2) }}>{'ORDER FOR DELIVERY!'}</Text>
                <FlatList
                    horizontal={true}

                    data={menuTypes}
                    renderItem={({ item }) =>
                        <ItemTypes
                            category={item.category}
                        />
                    }
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={styles.bottom}>
                <FlatList
                    data={data.menu}
                    renderItem={({ item }) =>
                        <Item
                            name={item.name}
                            description={item.description}
                            price={item.price}
                        />}
                    keyExtractor={item => item.id}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    hero: {
        flex: 4 / 10,
        backgroundColor: '#495E57'
    },
    menu: {
        // backgroundColor: 'blue',
        flex: 1.2 / 10,
        borderBottomWidth: 0.5,
        borderColor: 'silver'
    },
    bottom: {
        flex: 5 / 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: responsiveFontSize(23),
        margin: 5,
        marginLeft: 8,
    },
    text: {
        fontSize: responsiveFontSize(18),
        marginLeft: 8,
        width: responsiveWidth(70),

    },
    price: {
        marginLeft: 8,
        marginTop: 8,
        fontSize: responsiveFontSize(20),
    },
    seperator: {
        height: 0.3,
        backgroundColor: 'silver',
        marginHorizontal: responsiveWidth(3),
        marginVertical: 8
    },
    button: {
        backgroundColor: '#EDEFEE',
        height: 40,
        width: 90,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        // top: 9

    },
    lemonTitle: {
        fontSize: responsiveFontSize(39),
        marginLeft: 8,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#F4CE14',

    },
    textInput: {
        width: responsiveWidth(90),
        marginHorizontal: 10,
        height: responsiveHeight(5),
        backgroundColor: 'white',
        borderRadius: 14,
        marginTop: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 10

    }
});
