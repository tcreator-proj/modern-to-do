import { Box, Typography } from '@mui/material';
import React, { MouseEventHandler, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearDone, items } from '../../../redux/slice/toDoSlice';
import { ToDoItem } from '../../../ts/model/ToDoItem';
import style from "./FilterPanel.module.sass"
import FilterNavLink from './FilterNavLink/FilterNavLink';
import classNames from 'classnames';

function FilterPanel() {
  const dispatcher = useDispatch();
  const allItem: ToDoItem[] = useSelector(items);
  const leftItems: ToDoItem[] = allItem.filter((item: ToDoItem) => !item.getMark());

  const onAllCompleteRemove: MouseEventHandler = useCallback(() => {
    dispatcher(clearDone())
  }, [])

  let cleanerButtonClass = classNames(style.doneCleaner, {
    [style.doneCleanerHide]: leftItems.length === allItem.length
  })

  if (!allItem.length) return <></>

  return (
    <nav className={style.filterBox}>
      <Box>
        <Typography
          className={style.leftNumber}
          variant='subtitle1'
        >
          {leftItems.length} items left
        </Typography>
      </Box >
      <FilterNavLink />
      <Box className={style.doneCleanerBox}>
        <span
          onClick={onAllCompleteRemove}
          className={cleanerButtonClass}>
          Clear completed
        </span>
      </Box>
    </nav >
  )
}

export default FilterPanel