import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Id from '../../ts/model/Id';
import { ToDoItem } from '../../ts/model/ToDoItem';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../store';

export interface ToDoState {
  items: ToDoItem[],
}

const initialState: ToDoState = {
  items: [],
}

export const toDoSlice = createSlice({
  name: 'to-do',
  initialState,
  reducers: {
    append: (state, {payload}) => {
      const newItem: ToDoItem = new ToDoItem(payload)
      state.items.push(newItem);
    },
    remove: (state) => {
      // state.value -= 1
    },
    rewrite: (state, action: PayloadAction<number>) => {
      // state.value += action.payload
    },
    clearDone: (state) => {

    },
    mark: (state) => {

    },
    markAll: (state) => {

    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
})


export const { append, remove, rewrite, clearDone, mark, markAll } = toDoSlice.actions
export const items = (state: AppState) => state.todo.items;
export default toDoSlice.reducer