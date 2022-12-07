import { NextRouter, useRouter } from 'next/router';
import React, { useCallback } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { items, markAll } from '../../redux/slice/toDoSlice';
import { ToDoItem } from '../../ts/model/ToDoItem';
import { Box, List, ToggleButton, ToggleButtonGroup } from '@mui/material';
import FilterPanel from './FilterPanel/FilterPanel';
import Item from './Item/Item';
import { FormEventHandler } from 'react';
import style from './ListBody.module.sass';
import classNames from 'classnames';

function ListBody() {
  const router: NextRouter = useRouter();
  let AllItem: ToDoItem[] = useSelector(items);
  let itemList: ToDoItem[] = [];
  let dispatch = useDispatch();

  console.log(itemList, AllItem)

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
    <main className={style.listBox}>
      <section className={classNames(style.arrowDown,
            {
              [style.allComplete]: itemList.every((el: ToDoItem) => el.getMark())
            }
          )}>
        <ToggleButtonGroup
          
          color="primary"
          value='{alignment}'
          exclusive
          onChange={onAllChange}
          aria-label="Platform"
        >
          <ToggleButton value="web"></ToggleButton>
        </ToggleButtonGroup>
      </section>
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
    </main>
  )
}

export default ListBody;