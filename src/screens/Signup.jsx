/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const emailReExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordReExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const saveData = async () => {
    try {
      const user = {
        userName,
        email,
        password,
      };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User registered successfully!',
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to register user.',
      });
    }
  };

  const handleSignup = () => {
    if (!userName) {
      Toast.show({
        type: 'info',
        text1: 'Please enter  username',
      });
      return;
    }
    if (!emailReExp.test(email)) {
      Toast.show({
        type: 'info',
        text1: 'Please Enter a valid email id',
      });
      return;
    }
    if (!passwordReExp.test(password)) {
      Toast.show({
        type: 'info',
        text1: 'Please Enter a valid password',
      });
      return;
    }
    setTimeout(() => {
      saveData();
      navigation.dispatch(StackActions.replace('Login'));
    }, 1000);
  };

  const handleBack = () => {
    navigation.dispatch(StackActions.replace('Home'));
  };

  return (
    <>
      <View style={style.backarrowContainer}>
        <TouchableOpacity onPress={() => handleBack()}>
          <Image
            source={require('../images/backarrow.webp')}
            style={style.backarrowIcon}
          />
        </TouchableOpacity>
        <Text style={style.loginText}>Signup</Text>
      </View>
      <View style={style.container}>
        <Image
          source={require('../images/TodoListIcon.png')}
          style={style.img}
        />
        <Text
          onPress={() => navigation.dispatch(StackActions.replace('Home'))}
          style={style.text}>
          {' '}
          Signup
        </Text>

        <Image
          style={style.profileimg}
          source={require('../images/profileIcon.jpg')}
        />
        <TextInput
          style={style.inp}
          placeholder="Please enter your name"
          placeholderTextColor="black"
          onChangeText={setUserName}
        />

        <Image
          style={style.Emailimg}
          source={require('../images/emailIcon.webp')}
        />
        <TextInput
          style={style.inp}
          placeholder="Please enter email"
          placeholderTextColor="black"
          keyboardType="email"
          onChangeText={setEmail}
        />
        <Image
          style={style.passwordimg}
          source={require('../images/passwordIcon.jpg')}
        />
        <TextInput
          style={style.inpPassword}
          placeholder="Please enter password"
          placeholderTextColor="black"
          keyboardType="password"
          onChangeText={setPassword}
        />
        <TouchableOpacity style={style.btnLogin} onPress={() => handleSignup()}>
          <Text style={style.btnText}>Signup</Text>
        </TouchableOpacity>
        <Text style={style.RegisterText1}>
          Already have an account ?{' '}
          <Text
            style={style.RegisterText}
            onPress={() => navigation.dispatch(StackActions.replace('Login'))}>
            Login
          </Text>
        </Text>
      </View>
    </>
  );
};

export default Signup;

const style = StyleSheet.create({
  backarrowContainer: {
    width: '90%',
    height: 60,
    margin: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
  },
  backarrowIcon: {
    width: 40,
    height: 20,
    marginRight: 20,
  },
  loginText: {
    fontSize: 20,
    color: 'black',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'black',
    marginTop: 15,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginTop: 40,
  },
  inp: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
    color: 'black',
    paddingHorizontal: 50,
  },
  profileimg: {
    width: 30,
    height: 30,
    zIndex: 1,
    position: 'absolute',
    top: 225,
    left: 45,
  },
  Emailimg: {
    width: 30,
    height: 30,
    zIndex: 1,
    position: 'absolute',
    top: 295,
    left: 45,
  },
  inpPassword: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
    color: 'black',
    paddingHorizontal: 50,
  },
  passwordimg: {
    width: 25,
    height: 30,
    zIndex: 1,
    position: 'absolute',
    top: 365,
    left: 45,
  },
  eyeImg: {
    width: '100%',
    height: '100%',
  },
  btnLogin: {
    backgroundColor: '#1e90aa',
    borderRadius: 10,
    width: '80%',
    height: 50,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 5,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  },
  RegisterText: {
    fontSize: 15,
    color: 'blue',
  },
  RegisterText1: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold',
  },
});
