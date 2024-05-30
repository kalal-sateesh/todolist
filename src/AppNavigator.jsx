/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import TodoList from './screens/TodoList';
import AddTodo from './screens/AddTodo';
import EditTodo from './screens/EditTodo';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TodoList"
          component={TodoList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddTodo"
          component={AddTodo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditTodo"
          component={EditTodo}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
