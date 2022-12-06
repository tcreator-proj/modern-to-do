import { createSlice } from '@reduxjs/toolkit'
import Id from '../../ts/model/Id';
import { ToDoItem } from '../../ts/model/ToDoItem';
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
    append: (state, { payload }) => {
      state.items.push(new ToDoItem(payload));
    },
    remove: (state, { payload }) => {
      state.items = state.items.filter((item: any) => {
        const id: Id = item.getId();
        return id.toEqual(payload);
      })
    },
    rewrite: (state, { payload }) => {
      // state.items.push(newItem);
    },
    clearDone: (state) => {
      state.items = state.items.filter((item: any) => !item.getMark())
    },
    mark: (state, { payload }) => {
      state.items = state.items.map((item: any) => {
        const id: Id = item.getId();
        if (id.toEqual(payload)) item.toggleMark();
        return item;
      })
    },
    markAll: (state) => {
      const allMarks: boolean = state.items.every((item: any) => item.getMark())

      state.items.map((item: any) => {
        allMarks ? item.toUnmark() : item.toMark();
        
        return item;
      })

      if (allMarks) {
        state.items.forEach((item: any) => item.toUnmark())
      } else {
        state.items.forEach((item: any) => item.toMark())
      }
      state.items = [...state.items]
    }
  }
})


export const { append, remove, rewrite, clearDone, mark, markAll } = toDoSlice.actions
export const items = (state: AppState) => state.todo.items;
export default toDoSlice.reducer