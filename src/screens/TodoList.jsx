/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import {deleteTodo, toggleComplete} from '../redux/DataSlice';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoList = () => {
  const [name, setName] = useState('');
  const todos = useSelector(state => state.Data.Todos);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    navigation.dispatch(StackActions.replace('AddTodo'));
  };

  const handleDeleteTodo = index => {
    dispatch(deleteTodo({index: index}));
  };

  const handleComplete = index => {
    dispatch(toggleComplete({index: index}));
  };

  const handleEdit = (index, item) => {
    navigation.navigate('EditTodo', {
      index: index,
      tit: item.title,
      desc: item.description,
      expiry: item.expiryDate,
    });
  };

  const handleLogout = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'User Loggedout successfully!',
    });
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Home'));
    }, 1000);
  };

  const handleGetName = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const data = JSON.parse(userData);
      const userName = data.userName;
      setName(userName);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'No name found',
      });
    }
  };

  const todoList = todos.map((item, index) => {
    const currrentDate = new Date(
      new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'),
    );
    const expiryDate = new Date(item.expiryDate.split('/').reverse().join('-'));
    const expiry = expiryDate > currrentDate ? false : true;
    return (
      <View style={style.todo} key={index}>
        <Text
          style={item.completed ? style.todoHeaderStrikeoff : style.todoHeader}>
          {item.title} {expiry ? '(Expired)' : ''}
        </Text>
        <Text style={style.tododescription}>{item.description}</Text>
        <Text style={style.todoExpirydate}>Expiry : {item.expiryDate}</Text>
        <View style={style.todoBtnContainer}>
          <TouchableOpacity
            style={style.Btn}
            onPress={() => handleEdit(index, item)}>
            <Text style={style.BtnText}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.Btn}
            onPress={() => handleDeleteTodo(index)}>
            <Text style={style.BtnText}>DELETE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.completeBtn}
            onPress={() => handleComplete(index)}>
            <Text style={style.BtnText}>
              {item.completed ? 'COMPLETED' : 'UNCOMPLETED'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  useEffect(() => {
    handleGetName();
  }, []);

  const handleBack = () => {
    navigation.dispatch(StackActions.replace('Login'));
  };

  return (
    <SafeAreaView>
      <View style={style.backarrowContainer}>
        <TouchableOpacity onPress={() => handleBack()}>
          <Image
            source={require('../images/backarrow.webp')}
            style={style.backarrowIcon}
          />
        </TouchableOpacity>
        <Text style={style.loginText}>AddTodo</Text>
      </View>
      <View style={style.headerContainer}>
        <Text style={style.userName}>Hello {name}</Text>
        <TouchableOpacity style={style.btnLogin} onPress={() => handleLogout()}>
          <Image
            source={require('../images/logoutIcon2.jpg')}
            style={style.logoutImage}
          />
        </TouchableOpacity>
      </View>
      <View style={style.header}>
        <Text style={style.headerText}>TodoList</Text>
      </View>

      <View>
        <TouchableOpacity
          style={style.btnAddTodo}
          onPress={() => handleAddTodo()}>
          <Text style={style.btnAddTodoText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={style.todoContainer}>{todoList}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TodoList;

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
  userName: {
    width: '100%',
    height: 80,
    color: 'black',
    padding: 20,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    width: '90%',
    height: 100,
    borderBottomWidth: 1,
    margin: 'auto',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 35,
    paddingLeft: 5,
    paddingTop: 20,
  },
  headerContainer: {
    width: '80%',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnLogin: {
    width: '10%',
    height: 35,
  },
  logoutImage: {
    width: '100%',
    height: '100%',
  },
  btnText: {
    fontSize: 13,
    color: 'white',
  },
  btnAddTodo: {
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    margin: 'auto',
    marginBottom: 10,
  },
  btnAddTodoText: {
    fontSize: 25,
    color: 'white',
  },
  todoContainer: {
    width: '90%',
    margin: 'auto',
  },
  todo: {
    width: '100%',
    height: 'auto',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginTop: 10,
  },
  todoHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 20,
    paddingTop: 20,
  },
  todoHeaderStrikeoff: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    paddingLeft: 20,
    paddingTop: 20,
    textDecorationLine: 'line-through',
  },
  tododescription: {
    fontSize: 13,
    color: 'black',
    paddingLeft: 20,
    paddingTop: 10,
  },
  todoExpirydate: {
    fontSize: 15,
    color: 'black',
    paddingLeft: 20,
    paddingTop: 10,
  },
  todoBtnContainer: {
    width: '100%',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Btn: {
    width: 75,
    backgroundColor: 'rgb(247, 56, 104)',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  BtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  completeBtn: {
    width: 100,
    backgroundColor: 'rgb(247, 56, 104)',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
