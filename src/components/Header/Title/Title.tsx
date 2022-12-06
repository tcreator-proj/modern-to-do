import React from 'react';
import { Typography } from '@mui/material';
import style from './Title.module.sass'

function Title() {
  return (
    <Typography className={style.title} variant='h1'>
      todos
    </Typography>
  )
}

export default Title;