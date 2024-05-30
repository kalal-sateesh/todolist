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

const Login = () => {
  const navigation = useNavigation();
  const [isPassword, setIsPassword] = useState(true);
  const [eyeIcon, setEyeIcon] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const hadleshowHidePassword = () => {
    setEyeIcon(!eyeIcon);
    setIsPassword(!isPassword);
  };

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const data = JSON.parse(userData);
      const asyncEmail = data.email;
      const asyncPassword = data.password;
      if (asyncEmail === email && asyncPassword === password) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'User Loggedin successfully!',
        });
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('TodoList'));
        }, 1000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Please Enter valid credentials',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Login error',
      });
    }
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
        <Text style={style.loginText}>Login</Text>
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
          Login
        </Text>
        <Image
          style={style.Emailimg}
          source={require('../images/emailIcon.webp')}
        />
        <TextInput
          style={style.inp}
          placeholder="Please enter email"
          placeholderTextColor="black"
          onChangeText={setEmail}
        />
        <Image
          style={style.passwordimg}
          source={require('../images/passwordIcon.jpg')}
        />
        <TouchableOpacity
          style={style.TouchableOpacityeyeImg}
          onPress={hadleshowHidePassword}>
          <Image
            style={style.eyeImg}
            source={
              eyeIcon
                ? require('../images/passwordclosedIcon.jpg')
                : require('../images/passwordshowIcon.jpg')
            }
          />
        </TouchableOpacity>
        <TextInput
          style={style.inpPassword}
          placeholder="Please enter password"
          placeholderTextColor="black"
          onChangeText={setPassword}
          secureTextEntry={isPassword}
        />
        <TouchableOpacity style={style.btnLogin} onPress={() => handleLogin()}>
          <Text style={style.btnText}>Login</Text>
        </TouchableOpacity>
        <Text style={style.RegisterText1}>
          Don't have an account ?{' '}
          <Text
            style={style.RegisterText}
            onPress={() => navigation.dispatch(StackActions.replace('Signup'))}>
            register
          </Text>
        </Text>
      </View>
    </>
  );
};

export default Login;

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
    marginTop: 30,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginTop: 50,
  },
  inp: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 50,
    color: 'black',
    paddingHorizontal: 50,
  },
  Emailimg: {
    width: 30,
    height: 30,
    zIndex: 1,
    position: 'absolute',
    top: 280,
    left: 45,
  },
  inpPassword: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 30,
    color: 'black',
    paddingHorizontal: 50,
  },
  passwordimg: {
    width: 25,
    height: 30,
    zIndex: 1,
    position: 'absolute',
    top: 360,
    left: 45,
  },
  TouchableOpacityeyeImg: {
    width: 35,
    height: 30,
    position: 'absolute',
    top: 360,
    left: 270,
    zIndex: 2,
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
