import { TextField } from '@mui/material';
import { ChangeEvent, ChangeEventHandler, useRef, FormEventHandler, KeyboardEvent, useCallback, KeyboardEventHandler } from 'react';
import { append } from '../../../redux/slice/toDoSlice';
import style from "./MainInputField.module.sass"
import { useDispatch } from 'react-redux';

function MainInputField() {
  const dispatcher = useDispatch();

  const onEnterHandler: KeyboardEventHandler = useCallback((evt: KeyboardEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;

    if(evt.key === "Enter" && target.value) {
      dispatcher(append(target.value.trim()))
      target.value = "";
    }
  }, []);

  return (
    <TextField className={style.input} placeholder="Type your task here" onKeyDown={onEnterHandler}/>
  )
}

export default MainInputField;
