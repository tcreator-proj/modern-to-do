import { useSelector } from 'react-redux';
import App from '../src/components/App';
import { items } from '../src/redux/slice/toDoSlice';
import { ToDoItem } from '../src/ts/model/ToDoItem';

 function Home() {
  let allItems: ToDoItem[] = useSelector(items);

  return <App items={allItems}/>
}

export default Home;