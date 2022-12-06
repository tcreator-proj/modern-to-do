import { Box } from '@mui/material';
import Header from './Header/Header';
import style from './App.module.sass';

export default function App() {
  return (
    <Box className={style.box}>
      <Header />
    </Box>
  )
}
