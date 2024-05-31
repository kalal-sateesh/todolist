/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {addTodo} from '../redux/DataSlice';
import {StackActions, useNavigation} from '@react-navigation/native';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigation();

  const showDatepicker = () => {
    setShow(true);
  };

  const handleOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSaveTodo = () => {
    if (!title) {
      Toast.show({
        type: 'error',
        text1: 'Title Required',
      });
      return;
    }
    if (!description) {
      Toast.show({
        type: 'error',
        text1: 'Description Required',
      });
      return;
    }
    const dateString = date.toLocaleDateString('en-GB');
    dispatch(
      addTodo({
        title: title,
        description: description,
        expiryDate: dateString,
        completed: false,
      }),
    );
    Toast.show({
      type: 'success',
      text1: 'Todo added successfully!',
    });
    setTimeout(() => {
      navigate.dispatch(StackActions.replace('TodoList'));
    }, 1000);
  };

  const handleBack = () => {
    navigate.dispatch(StackActions.replace('TodoList'));
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
        <Text style={style.loginText}>AddTodo</Text>
      </View>
      <View style={style.container}>
        <TextInput
          style={style.inp}
          placeholder="Enter title"
          placeholderTextColor="black"
          onChangeText={setTitle}
        />
        <TextInput
          style={style.inp}
          placeholder="Enter description"
          placeholderTextColor="black"
          onChangeText={setDescription}
        />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={handleOnChange}
          />
        )}

        <TouchableOpacity style={style.Btn} onPress={showDatepicker}>
          <Text style={style.btnText}>Select Expiry Date</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.Btn} onPress={() => handleSaveTodo()}>
          <Text style={style.btnText}>Save Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.Btn} onPress={() => handleBack()}>
          <Text style={style.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddTodo;

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  inp: {
    width: '90%',
    height: 50,
    margin: 'auto',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    color: 'black',
    marginBottom: 0,
  },
  Btn: {
    backgroundColor: '#1e90aa',
    borderRadius: 10,
    width: '80%',
    height: 50,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
  },
});
