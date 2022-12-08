import { ListItem, Checkbox, ListItemText, TextField } from '@mui/material';
import style from './Item.module.sass';
import React, { MouseEventHandler, MouseEvent, useCallback, useState, FormEvent, KeyboardEventHandler, FormEventHandler, KeyboardEvent } from 'react';
import { editedText, mark, remove, PayloadBody } from '../../../redux/slice/toDoSlice';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { getTargetPayloadBody } from './Item.utill';

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
    dispatcher(mark(getTargetPayloadBody(target)));
  }, [])

  const onClickRemoveHandler: MouseEventHandler = useCallback((evt: MouseEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;
    dispatcher(remove(getTargetPayloadBody(target)))
  }, [])

  const onEditItem = (evt: KeyboardEvent) => {
    const input: HTMLInputElement = evt.target as HTMLInputElement;
    const payload: PayloadBody = getTargetPayloadBody(input)
    if(evt.key === "Enter") {
      dispatcher(payload.text ? editedText(payload) : remove(payload) )
      setRewriting(false);
    }

  }

  const onBlurHandler: FormEventHandler = (evt: FormEvent) => {
    const input: HTMLInputElement = evt.target as HTMLInputElement;
    const payload: PayloadBody = getTargetPayloadBody(input)
    dispatcher(input.value ? editedText(payload) : remove(payload) )
    setRewriting(false);
  }

  const onOpenInput: MouseEventHandler = () => {
    setRewriting(true);
  }

  const listItemTextClass = classNames(
    style.itemText,
    {
      [style.itemTextIsMarked]: marked
    }
  )
  const editedClassName = classNames(
    style.edited,
    {
      [style.show]: edited
    }
  )
  const checkboxStyle = classNames(
    style.checkbox,
    {
      [style.checkboxChecked]: marked
    }
  )

  return (
    <ListItem className={style.item}>
      {!rewriting ?
        <>
          <Checkbox
            id={id}
            className={checkboxStyle}
            checked={marked}
            disableRipple
            onClick={onMarkHandler}
          />
          <ListItemText
            className={listItemTextClass}
            onDoubleClick={onOpenInput}>
            {text}
          </ListItemText>
          <span className={editedClassName}>edited</span>

          <button
            id={id}
            className={style.delete}
            onClick={onClickRemoveHandler}
          >
          </button>
        </>
        : <TextField
          id={id}
          defaultValue={text}
          className={style.hiddenField}
          autoFocus
          onKeyDown={onEditItem}
          onBlur={onBlurHandler} />}
    </ListItem>
  )
}

export default React.memo(Item)