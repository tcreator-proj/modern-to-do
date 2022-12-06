import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Id from '../../ts/model/Id';
import { ToDoItem } from '../../ts/model/ToDoItem';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../store';

export interface ToDoState {
  idList: Id[],
  toDoItems: Map<Id, ToDoItem>
}

const initialState: ToDoState = {
  idList: [new Id(), new Id()],
  toDoItems: new Map()
}

export const toDoSlice = createSlice({
  name: 'to-do',
  initialState,
  reducers: {
    append: (state) => {
      // state.value += 1
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
export const state = (state: AppState) => state.todo.idList
export default toDoSlice.reducer