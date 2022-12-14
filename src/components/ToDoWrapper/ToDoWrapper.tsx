import React, { FormEvent, KeyboardEventHandler, KeyboardEvent, MouseEventHandler, useCallback, useMemo, MouseEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { editedText, mark, markAll, PayloadBody, remove } from '../../redux/slice/toDoSlice';
import { ToDoItem } from '../../ts/model/ToDoItem';
import { Box, List } from '@mui/material';
import Item from './Item/Item';
import { FormEventHandler } from 'react';
import style from './ToDoWrapper.module.sass';
import ToggleAllItems from './ToggleAllItems/ToggleAllItems';
import NavigationPanelWrapper from '../NavigationPanelWrapper/NavigationPanelWrapper';
import { getTargetPayloadBody } from './Item/Item.utill';

interface ToDoItems {
  items: ToDoItem[],
  isEmptyToDos: boolean
}

function ToDoWrapper({ items, isEmptyToDos }: ToDoItems) {
  let dispatch = useDispatch();

  const onAllChange: FormEventHandler = useCallback(() => {
    dispatch(markAll());
  }, [dispatch]);

  const onMarkHandler: MouseEventHandler = useCallback((evt: MouseEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;
    dispatch(mark(getTargetPayloadBody(target)));
  }, [dispatch]);

  const onClickRemoveHandler: MouseEventHandler = useCallback((evt: MouseEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;
    dispatch(remove(getTargetPayloadBody(target)));
  }, [dispatch]);

  const onEditItem: Function = useCallback((callback: Function): KeyboardEventHandler => {
    return (evt: KeyboardEvent) => {
      const input: HTMLInputElement = evt.target as HTMLInputElement;
      const payload: PayloadBody = getTargetPayloadBody(input);
      if (evt.key === "Enter") {
        dispatch(payload.text ? editedText(payload) : remove(payload));
        callback();
      }
    }
  }, [dispatch]);

  const onBlurHandler: FormEventHandler = useCallback((evt: FormEvent) => {
    const input: HTMLInputElement = evt.target as HTMLInputElement;
    const payload: PayloadBody = getTargetPayloadBody(input);
    dispatch(input.value ? editedText(payload) : remove(payload));
  }, [dispatch]);

  const mapToDoItemElement = useCallback(() => {
    return items.map((item: ToDoItem) => <Item
      key={item.getId().id}
      id={item.getId().id}
      text={item.getText()}
      edited={item.getEdited()}
      marked={item.getMark()}
      onCheckbockClick={onMarkHandler}
      onClickToRemove={onClickRemoveHandler}
      onChangeEditorField={onEditItem}
      onBlurHandler={onBlurHandler} />)
  }, [items]);

  const didEverythingItemsCompleted: boolean = useMemo(() => {
    return items.every((el: ToDoItem) => el.getMark());
  }, [items]);

  if (!isEmptyToDos) {
    return <></>;
  }
  return (
    <main className={style.listBox}>
      <ToggleAllItems
        onChangeAllHandler={onAllChange}
        isEverythingCompleted={didEverythingItemsCompleted} />
      <List>
        {mapToDoItemElement()}
      </List>
      <Box>
        <NavigationPanelWrapper />
      </Box>
    </main>
  )
}

export default React.memo(ToDoWrapper);