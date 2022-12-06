import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { items } from '../../redux/slice/toDoSlice';
import { ToDoItem } from '../../ts/model/ToDoItem';
import { Box, List } from '@mui/material';
import FilterPanel from './FilterPanel/FilterPanel';
import Item from './Item/Item';

function ListBody() {
  const router: NextRouter = useRouter();
  let itemList: ToDoItem[] = useSelector(items)

  switch (router.route) {
    case "/completed": {
      itemList = itemList.filter((item: ToDoItem) => item.getMark());
      break;
    }
    case "/active": {
      itemList = itemList.filter((item: ToDoItem) => !item.getMark());
      break;
    }
  }

  return (
    <Box>
      <List>
        {
        itemList.length && itemList.map((item: ToDoItem) => <Item
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