import { Box } from '@mui/material';
import Header from './Header/Header';
import style from './App.module.sass';
import ListBody from './ListBody/ListBody';

export default function App() {
  return (
    <Box className={style.box}>
      <Header />
      <ListBody />
    </Box>
  )
}
