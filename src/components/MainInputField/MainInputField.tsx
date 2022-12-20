import { TextField } from '@mui/material';
import React from 'react';
import { KeyboardEventHandler } from 'react';
import style from "./MainInputField.module.sass"

interface InputType {
  onEnterHandler: KeyboardEventHandler
}

function MainInputField({onEnterHandler}: InputType) {
  return (
    <TextField
      className={style.input}
      placeholder="What needs to be done"
      onKeyDown={onEnterHandler} />
  )
}

export default React.memo(MainInputField);
