import { NextRouter, useRouter } from 'next/router';
import React, { useCallback } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { items, markAll } from '../../redux/slice/toDoSlice';
import { ToDoItem } from '../../ts/model/ToDoItem';
import { Box, List, ToggleButton, ToggleButtonGroup } from '@mui/material';
import FilterPanel from './FilterPanel/FilterPanel';
import Item from './Item/Item';
import { FormEventHandler } from 'react';

function ListBody() {
  const router: NextRouter = useRouter();
  let AllItem: ToDoItem[] = useSelector(items);
  let itemList: ToDoItem[] = [];
  let dispatch = useDispatch();

  switch (router.route) {
    case "/completed": {
      itemList = AllItem.filter((item: ToDoItem) => item.getMark());
      break;
    }
    case "/active": {
      itemList = AllItem.filter((item: ToDoItem) => !item.getMark());
      break;
    }
    default: {
      itemList = AllItem;
    }
  }

  const onAllChange: FormEventHandler = useCallback(() => {
    dispatch(markAll());
  }, [])

  if (!AllItem.length) return <></>;

  return (
    <Box>
      <Box>
        <ToggleButtonGroup
          color="primary"
          value='{alignment}'
          exclusive
          onChange={onAllChange}
          aria-label="Platform"
        >
          <ToggleButton value="web">Web</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <List>
        {
          itemList.map((item: ToDoItem) => <Item
            key={item.getId().id}
            id={item.getId().id}
            text={item.getText()}
            edited={item.getEdited()}
            marked={item.getMark()} />)
        }
      </List>
      <Box>
        <FilterPanel />
      </Box>
    </Box>
  )
}

export default ListBody;