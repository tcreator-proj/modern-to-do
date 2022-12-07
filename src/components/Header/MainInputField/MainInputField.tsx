import { TextField } from '@mui/material';
import { KeyboardEvent, useCallback, KeyboardEventHandler } from 'react';
import { append, PayloadBody } from '../../../redux/slice/toDoSlice';
import style from "./MainInputField.module.sass"
import { useDispatch } from 'react-redux';

function MainInputField() {
  const dispatcher = useDispatch();

  const onEnterHandler: KeyboardEventHandler = useCallback((evt: KeyboardEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;

    if (evt.key === "Enter" && target.value) {

      const payload: PayloadBody = {
        id: '',
        text: target.value.trim()
      }
      dispatcher(append(payload))
      target.value = "";
    }
  }, []);

  return (
    <TextField
      className={style.input}
      placeholder="What needs to be done"
      onKeyDown={onEnterHandler} />
  )
}

export default MainInputField;
