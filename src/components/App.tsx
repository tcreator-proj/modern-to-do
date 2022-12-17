import { Box } from '@mui/material';
import style from './App.module.sass';
import { ToDoItem } from '../ts/model/ToDoItem';
import ToDoWrapper from './ListBody/ToDoWrapper';
import { FormEventHandler, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { markAll } from '../redux/slice/toDoSlice';
import HeaderWrapper from './Header/HeaderWrapper';

interface AppType {
  items: ToDoItem[]
}

export default function App({items}: AppType) {
  let dispatch = useDispatch();

  const onAllChange: FormEventHandler = useCallback(() => {
    dispatch(markAll());
  }, []);

  return (
    <Box className={style.box}>
      <HeaderWrapper />
      <ToDoWrapper items={items} onChangeAllHandler={onAllChange} />
    </Box>
  )
}
