import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import App from '../src/components/App';
import { items } from '../src/redux/slice/toDoSlice';
import { ToDoItem } from '../src/ts/model/ToDoItem';

function Active() {
  let allItems: ToDoItem[] = useSelector(items);
  const activedItems: ToDoItem[] = useMemo(() => allItems
    .filter((item: ToDoItem) => !item.getMark()), [allItems]);

  return (
    <App items={activedItems} isEmptyToDos={!!allItems.length}/>
  )
}

export default Active;