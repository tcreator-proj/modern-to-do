import { ListItem, Checkbox, ListItemText } from '@mui/material';
import style from './Item.module.sass';
import React, { MouseEventHandler, MouseEvent, useCallback } from 'react';
import { mark } from '../../../redux/slice/toDoSlice';
import { useDispatch } from 'react-redux';

interface ItemType {
  id: string,
  text: string,
  edited: boolean,
  marked: boolean
}

function Item(props: ItemType) {
  const { id, text, edited, marked } = props;
  const dispatcher = useDispatch()
  const onMarkHandler: MouseEventHandler = useCallback((evt: MouseEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;
    dispatcher(mark(target.getAttribute("id")))
  }, [])

  return (
    <ListItem className={style.item}>
      <Checkbox
        id={id}
        className={style.checkbox}
        defaultChecked={marked}
        disableRipple
        onClick={onMarkHandler}
      />
      <ListItemText className={style[`markIs${marked}`]}>{text}</ListItemText>
      {edited && <span className={style.edited}>edited</span>}
    </ListItem>
  )
}

export default React.memo(Item)