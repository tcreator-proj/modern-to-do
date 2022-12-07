import { ListItem, Checkbox, ListItemText, Box, TextField } from '@mui/material';
import style from './Item.module.sass';
import React, { MouseEventHandler, MouseEvent, useCallback, useState, FormEvent } from 'react';
import { editedText, mark, remove, PayloadBody } from '../../../redux/slice/toDoSlice';
import { useDispatch } from 'react-redux';
import { KeyboardEventHandler, FormEventHandler } from 'react';

interface ItemType {
  id: string,
  text: string,
  edited: boolean,
  marked: boolean
}

function Item(props: ItemType) {
  const { id, text, edited, marked } = props;
  const [rewriting, setRewriting] = useState(false);

  const dispatcher = useDispatch();

  const onMarkHandler: MouseEventHandler = useCallback((evt: MouseEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;

    const payload: PayloadBody = {
      id: target.getAttribute("id"),
      text: null
    }

    dispatcher(mark(payload))
  }, [])

  const onClickRemoveHandler: MouseEventHandler = useCallback((evt: MouseEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;

    const payload: PayloadBody = {
      id: target.getAttribute("id"),
      text: null
    }

    dispatcher(remove(payload))
  }, [])

  const onEditItem: KeyboardEventHandler = (evt: KeyboardEvent) => {
    const input: HTMLInputElement = evt.target as HTMLInputElement;
    if (evt.key === "Enter") {
      const payload: PayloadBody = {
        id: input.getAttribute("id"),
        text: input.value
      }

      if (input.value) {
        dispatcher(editedText(payload))
      } else {
        dispatcher(remove(payload))
      }
      setRewriting(false);
    }
  }


  const onBlurHandler: FormEventHandler = (evt: FormEvent) => {
    const input: HTMLInputElement = evt.target as HTMLInputElement;
    const payload: PayloadBody = {
      id: input.getAttribute("id"),
      text: input.value
    }

    if (input.value) {
      dispatcher(editedText(payload))
    } else {
      dispatcher(remove(payload))
    }
    setRewriting(false);
  }

  const onOpenInput: MouseEventHandler = () => {
    setRewriting(true);
  }

  return (
    <ListItem className={style.item}>
      {!rewriting ?
        <>
          <Checkbox
            id={id}
            className={style.checkbox}
            checked={marked}
            disableRipple
            onClick={onMarkHandler}
          />
          <ListItemText className={style[`markIs${marked}`]} onDoubleClick={onOpenInput}>{text}</ListItemText>
          {edited && <span className={style.edited}>edited</span>}
          <Box id={id} onClick={onClickRemoveHandler}>Удалить</Box>
        </>
        : <TextField id={id} defaultValue={text} autoFocus onKeyDown={onEditItem} onBlur={onBlurHandler} />}
    </ListItem>
  )
}

export default React.memo(Item)