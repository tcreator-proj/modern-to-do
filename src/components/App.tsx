import { Box } from '@mui/material';
import style from './App.module.sass';
import { ToDoItem } from '../ts/model/ToDoItem';
import ToDoWrapper from './ToDoWrapper/ToDoWrapper';
import HeaderWrapper from './Header/HeaderWrapper';

interface AppType {
  items: ToDoItem[]
}

export default function App({items}: AppType) {

  return (
    <Box className={style.box}>
      <HeaderWrapper />
      <ToDoWrapper items={items} />
    </Box>
  )
}
