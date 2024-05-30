/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {editTodo} from '../redux/DataSlice';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigation();
  const route = useRoute();

  const {index, tit, desc, expiry} = route.params;

  const showDatepicker = () => {
    setShow(true);
  };

  const handleOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(date);
  };

  const handleEditTodo = () => {
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
      editTodo({
        index: index,
        title: title,
        description: description,
        expiryDate: dateString,
      }),
    );
    Toast.show({
      type: 'success',
      text1: 'Todo Saved successfully!',
    });
    setTimeout(() => {
      navigate.dispatch(StackActions.replace('TodoList'));
    }, 1000);
  };

  const handleBack = () => {
    navigate.dispatch(StackActions.replace('TodoList'));
  };

  useEffect(() => {
    setTitle(tit);
    setDescription(desc);
    if (expiry) {
      const [day, month, year] = expiry.split('/');
      const parsedDate = new Date(`${year}-${month}-${day}`);
      setDate(parsedDate);
    }
  }, [tit, desc, expiry]);

  return (
    <>
      <View style={style.backarrowContainer}>
        <TouchableOpacity onPress={() => handleBack()}>
          <Image
            source={require('../images/backarrow.webp')}
            style={style.backarrowIcon}
          />
        </TouchableOpacity>
        <Text style={style.loginText}>TodoList</Text>
      </View>
      <View style={style.container}>
        <TextInput
          style={style.inp}
          placeholder="Enter title"
          placeholderTextColor="black"
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          style={style.inp}
          placeholder="Enter description"
          placeholderTextColor="black"
          onChangeText={setDescription}
          value={description}
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

        <TouchableOpacity style={style.Btn} onPress={() => handleEditTodo()}>
          <Text style={style.btnText}>Save Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.Btn} onPress={() => handleBack()}>
          <Text style={style.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditTodo;

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
