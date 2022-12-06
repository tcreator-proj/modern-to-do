import { Box, Typography } from '@mui/material';
import Link from 'next/link'
import React, { MouseEventHandler, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearDone, items } from '../../../redux/slice/toDoSlice';
import { ToDoItem } from '../../../ts/model/ToDoItem';

function FilterPanel() {
  const dispatcher = useDispatch();
  const allItem: ToDoItem[] = useSelector(items);
  const leftItems: ToDoItem[] = allItem.filter((item: ToDoItem) => !item.getMark());

  const onAllCompleteRemove: MouseEventHandler = useCallback(() => {
    dispatcher(clearDone())
  }, [])

  if (!allItem.length) return <></>

  return (
    <Box>
      <Box>
        <Typography variant='subtitle1'>{leftItems.length} items left</Typography>
      </Box >
      <Box>
        <ul>
          <li>
            <Link href="/">All</Link>
          </li>
          <li>
            <Link href="/completed">Completed</Link>
          </li>
          <li>
            <Link href="/active">Active</Link>
          </li>
        </ul>
      </Box>
      <Box>
        <span onClick={onAllCompleteRemove}>Clear completed</span>
      </Box>
    </Box >
  )
}

export default FilterPanel