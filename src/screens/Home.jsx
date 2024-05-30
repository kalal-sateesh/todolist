/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../images/background.jpg')}
      style={style.background}>
      <View style={style.open}>
        <Text style={style.text1}> Welcome to todo list application</Text>
        <Text style={style.text}> Login to continue</Text>
        <TouchableOpacity
          style={style.btnLogin}
          onPress={() => navigation.dispatch(StackActions.replace('Login'))}>
          <Text style={style.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.btn}
          onPress={() => navigation.dispatch(StackActions.replace('Signup'))}>
          <Text style={style.btnText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Home;
const style = StyleSheet.create({
  open: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  Img: {
    width: '100%',
    height: '70%',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 1,
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'start',
    padding: 10,
  },
  text1: {
    fontSize: 20,
    color: 'white',
    textAlign: 'start',
    padding: 10,
    marginTop: 100,
  },
  btnLogin: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '90%',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 350,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '90%',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  },
});
