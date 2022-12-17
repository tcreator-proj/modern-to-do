import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import App from '../src/components/App';
import { items } from '../src/redux/slice/toDoSlice';
import { ToDoItem } from '../src/ts/model/ToDoItem';

function Completed() {
  let allItems: ToDoItem[] = useSelector(items);
  const completedItems: ToDoItem[] = useMemo(() => allItems
    .filter((item: ToDoItem) => item.getMark()), [allItems]);

  return (
    <App items={completedItems} />
  )
};

export default Completed;