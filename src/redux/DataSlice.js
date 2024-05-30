/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  Todos: [],
};
const DataSlice = createSlice({
  name: 'Data',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.Todos.push(action.payload);
    },
    deleteTodo(state, action) {
      state.Todos.splice(action.payload.index, 1);
    },
    toggleComplete(state, action) {
      state.Todos[action.payload.index].completed =
        !state.Todos[action.payload.index].completed;
    },
    editTodo(state, action) {
      state.Todos[action.payload.index].title = action.payload.title;
      state.Todos[action.payload.index].description =
        action.payload.description;
      state.Todos[action.payload.index].expiryDate = action.payload.expiryDate;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleComplete,
  editTodo,
} = DataSlice.actions;

export default DataSlice.reducer;
