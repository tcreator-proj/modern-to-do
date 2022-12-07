import { createSlice } from '@reduxjs/toolkit'
import Id from '../../ts/model/Id';
import { ToDoItem } from '../../ts/model/ToDoItem';
import { AppState } from '../store';

export interface ToDoState {
  items: ToDoItem[],
}

export interface PayloadBody {
  id: string | null,
  text: string | null
}

interface Payload {
  payload: PayloadBody
}

const initialState: ToDoState = {
  items: [],
}

export const toDoSlice = createSlice({
  name: 'to-do',
  initialState,
  reducers: {
    append: (state, { payload }: Payload) => {
      state.items.push(new ToDoItem(payload.text));
    },
    remove: (state, { payload }: Payload) => {

      state.items = state.items.filter((item: any) => {
        const id: Id = item.getId();
        return !id.toEqual(payload.id);
      })
    },
    editedText: (state, {payload}: Payload) => {
      const {id, text} = payload;
      
      state.items = state.items.map((item: any) => {
        const currentId: Id = item.getId();
        if (currentId.toEqual(id)) item.changeText(text);
        return item;
      })
    },
    clearDone: (state) => {
      state.items = state.items.filter((item: any) => !item.getMark())
    },
    mark: (state, { payload }: Payload) => {
      state.items = state.items.map((item: any) => {
        const id: Id = item.getId();
        if (id.toEqual(payload.id)) item.toggleMark();
        return item;
      })
    },
    markAll: (state) => {
      const allMarks: boolean = state.items.every((item: any) => item.getMark())

      state.items.map((item: any) => {
        allMarks ? item.toUnmark() : item.toMark();

        return item;
      })

      state.items = [...state.items]
    }
  }
})


export const { append, remove, editedText, clearDone, mark, markAll } = toDoSlice.actions
export const items = (state: AppState) => state.todo.items;
export default toDoSlice.reducer