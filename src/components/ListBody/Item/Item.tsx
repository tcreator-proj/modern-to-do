import { ListItem, Checkbox, ListItemText, TextField } from '@mui/material';
import style from './Item.module.sass';
import React, { MouseEventHandler, MouseEvent, useCallback, useState, FormEvent, KeyboardEventHandler, FormEventHandler, KeyboardEvent, useMemo } from 'react';
import { editedText, mark, remove, PayloadBody } from '../../../redux/slice/toDoSlice';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { getTargetPayloadBody } from './Item.utill';

interface ItemType {
  id: string,
  text: string,
  edited: boolean,
  marked: boolean,
  onCheckbockClick: MouseEventHandler,
  onClickToRemove: MouseEventHandler,
  onChangeEditorField: KeyboardEventHandler,
  onBlurHandler: FormEventHandler
}

function Item(props: ItemType) {
  const {
    id,
    text,
    edited,
    marked,
    onCheckbockClick,
    onClickToRemove,
    onChangeEditorField,
    onBlurHandler
  } = props;
  const [rewriting, setRewriting] = useState(false);

  const onDblClickToOpenInput: MouseEventHandler = useCallback(() => {
    setRewriting(true);
  }, []);

  const onBlurHadlerAdapter = useCallback((evt: FormEvent) => {
    onBlurHandler(evt);
    setRewriting(false);
  }, []);

  const onChangeEditorFieldAdapter = useCallback((evt: KeyboardEvent) => {
    onChangeEditorField(evt);
    setRewriting(false);
  }, []);

  const listItemTextClass: string = useMemo(() => classNames(
    style.itemText,
    {
      [style.itemTextIsMarked]: marked
    }
  ), [marked]);

  const editedClassName: string = useMemo(() => classNames(
    style.edited,
    {
      [style.show]: edited
    }
  ), [edited]);

  const checkboxStyle: string = useMemo(() => classNames(
    style.checkbox,
    {
      [style.checkboxChecked]: marked
    }
  ), [marked]);

  return (
    <ListItem className={style.item}>
      {!rewriting ?
        <>
          <Checkbox
            id={id}
            className={checkboxStyle}
            checked={marked}
            disableRipple
            onClick={onCheckbockClick}
          />
          <ListItemText
            className={listItemTextClass}
            onDoubleClick={onDblClickToOpenInput}>
            {text}
          </ListItemText>
          <span className={editedClassName}>edited</span>

          <button
            id={id}
            className={style.delete}
            onClick={onClickToRemove}
          >
          </button>
        </>
        : <TextField
          id={id}
          defaultValue={text}
          className={style.hiddenField}
          autoFocus
          onKeyDown={onChangeEditorFieldAdapter}
          onBlur={onBlurHadlerAdapter} />}
    </ListItem>
  )
}

export default React.memo(Item);