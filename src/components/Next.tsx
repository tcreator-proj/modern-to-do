import { useSelector } from 'react-redux'
import { state } from '../redux/slice/toDoSlice';
import Id from '../ts/model/Id';

export const Next = () => {
  const authState = useSelector(state);
  return (
    <ul>
      {authState.map((id: Id) => <li key={id.id}>{id.id}</li>)}
    </ul>)
}

export default Next;