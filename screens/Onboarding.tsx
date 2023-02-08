import { useEffect, useState, } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Onboarding({ navigation }) {


  const [data, setData] = useState({
    name: '',
    email: '',
    check_textInputChange: false,
    check_email: false,
  });

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(data)
      await AsyncStorage.setItem('profileData', jsonValue)
      navigation.navigate('HomeScreen');
    } catch (e) {
      // saving error
    }
    console.log(data)
  }

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

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 / 12, backgroundColor: "#ff33", height: 10, alignItems: 'center', justifyContent: 'center', paddingTop: 25 }}>
        <Image
          source={require('../assets/Logo.png')}
          style={{ resizeMode: 'stretch', height: 50, width: 250 }}
        />
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'silver', flex: 1 }}>
        <Text style={{ fontSize: 30, margin: 30, top: -60 }}>
          {'Join Us!'}
        </Text>
        <Text style={{
          fontSize: '20',
          margin: 10,
        }}>{'First Name'}</Text>
        <TextInput
          onChangeText={(val) => textInputChange(val)}
          placeholder="Type your Name"
          style={{
            height: 40,
            backgroundColor: 'white',
            width: 250,
            borderRadius: 10,
            padding: 5,
            fontSize: 20,

          }} />
        <Text style={{
          fontSize: '20',
          margin: 10,
        }}>{'Email'}</Text>
        <TextInput
          onChangeText={(val) => handleEmailChange(val)}
          placeholder="Type your Email"
          keyboardType="email"
          style={{
            height: 40,
            backgroundColor: 'white',
            width: 250,
            borderRadius: 10,
            padding: 5,
            fontSize: 20
          }} />
      </View>
      <View style={{ flex: 4 / 10, backgroundColor: 'white' }}>
        <TouchableOpacity
          onPress={storeData}
          disabled={!data.check_email && !data.check_textInputChange}
          style={{
            backgroundColor: data.check_email && data.check_textInputChange ? 'green' : 'grey',
            height: 50,
            width: 150,
            borderRadius: 20,
            top: 40,
            left: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 30 }}> {'Next'}</Text>
        </ TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
