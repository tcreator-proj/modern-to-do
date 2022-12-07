import { ListItem, Checkbox, ListItemText, TextField } from '@mui/material';
import style from './Item.module.sass';
import React, { MouseEventHandler, MouseEvent, useCallback, useState, FormEvent, KeyboardEventHandler, FormEventHandler, KeyboardEvent } from 'react';
import { editedText, mark, remove, PayloadBody } from '../../../redux/slice/toDoSlice';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

interface ItemType {
  id: string,
  text: string,
  edited: boolean,
  marked: boolean
}

type AttributeData = string | undefined | null;

function Item(props: ItemType) {
  const { id, text, edited, marked } = props;
  const [rewriting, setRewriting] = useState(false);
  const dispatcher = useDispatch();

  const onMarkHandler: MouseEventHandler = useCallback((evt: MouseEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;
    const attrId: AttributeData = target.getAttribute("id");
    if (attrId) {
      const payload: PayloadBody = {
        id: attrId,
        text: ''
      }
      
    dispatcher(mark(payload));
    }

  }, [])

  const onClickRemoveHandler: MouseEventHandler = useCallback((evt: MouseEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;
    const attrId: AttributeData = target.getAttribute("id");
    if (attrId) {
      const payload: PayloadBody = {
        id: attrId,
        text: ''
      }

      dispatcher(remove(payload))
    }
  }, [])

  const onEditItem = (evt: KeyboardEvent) => {
    const input: HTMLInputElement = evt.target as HTMLInputElement;

    if (evt.key === "Enter") {

      const attrId: AttributeData = input.getAttribute("id");
      if (attrId) {
        const payload: PayloadBody = {
          id: attrId,
          text: ''
        }
        if (input.value) {
          payload.text = input.value.trim();
          dispatcher(editedText(payload))
        } else {
          dispatcher(remove(payload))
        }
      }
      setRewriting(false);
    }
  }


  const onBlurHandler: FormEventHandler = (evt: FormEvent) => {
    const input: HTMLInputElement = evt.target as HTMLInputElement;
    const attrId: AttributeData = input.getAttribute("id");
    if (attrId) {
      const payload: PayloadBody = {
        id: attrId,
        text: ''
      }
      if (input.value) {
        payload.text = input.value.trim();
        dispatcher(editedText(payload))
      } else {
        dispatcher(remove(payload))
      }
    }

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