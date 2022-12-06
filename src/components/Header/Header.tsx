import React from 'react';
import { Typography } from '@mui/material';
import style from './Header.module.sass'

function Header() {
  return (
    <Typography className={style.header} variant='h1'>
      todos
    </Typography>
  )
}

export default Header