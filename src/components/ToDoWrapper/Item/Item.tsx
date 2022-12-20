import { ListItem, Checkbox, ListItemText, TextField } from '@mui/material';
import style from './Item.module.sass';
import React, { MouseEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';
import classNames from 'classnames';

interface ItemType {
  id: string,
  text: string,
  edited: boolean,
  marked: boolean,
  rewriting: boolean,
  onCheckbockClick: MouseEventHandler,
  onClickToRemove: MouseEventHandler,
  onChangeEditorField: KeyboardEventHandler,
  onBlurHandler: FormEventHandler,
  onDblClickToOpenInput: MouseEventHandler
}

function Item(props: ItemType) {
  const {
    id,
    text,
    edited,
    marked,
    rewriting,
    onCheckbockClick,
    onClickToRemove,
    onChangeEditorField,
    onBlurHandler,
    onDblClickToOpenInput
  } = props;

  const listItemTextClass: string = classNames(
    style.itemText,
    {
      [style.itemTextIsMarked]: marked
    }
  );

  const editedClassName: string = classNames(
    style.edited,
    {
      [style.show]: edited
    }
  );

  const checkboxStyle: string = classNames(
    style.checkbox,
    {
      [style.checkboxChecked]: marked
    }
  );

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
          onKeyDown={onChangeEditorField}
          onBlur={onBlurHandler} />}
    </ListItem>
  )
}

export default React.memo(Item);