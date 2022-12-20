import React, { KeyboardEventHandler, useCallback, KeyboardEvent} from 'react';
import { useDispatch } from 'react-redux';
import { PayloadBody, append } from '../../redux/slice/toDoSlice';
import MainInputField from '../MainInputField/MainInputField';
import Title from '../Title/Title';

function HeaderWrapper() {
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
  }, [dispatcher]);

  return (
    <header>
      <Title />
      <MainInputField onEnterHandler={onEnterHandler} />
    </header>
  )
}

export default HeaderWrapper