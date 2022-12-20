import React, { MouseEventHandler, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { items, clearDone } from '../../redux/slice/toDoSlice';
import { ToDoItem } from '../../ts/model/ToDoItem';
import { PathNames } from '../ToDoWrapper/FilterPanel/FilterNavLink/FilterNavLink.types';
import FilterPanel from '../ToDoWrapper/FilterPanel/FilterPanel';
import { useRouter } from 'next/router';

function NavigationPanelWrapper() {
  const dispatcher = useDispatch();
  const allItem: ToDoItem[] = useSelector(items);
  const activeRoute = useRouter().route;

  const leftItems: ToDoItem[] = useMemo(() => {
    return allItem.filter((item: ToDoItem) => !item.getMark())
  }, [allItem]);

  const isCompletedExists: boolean = useMemo(
    () => allItem.length - leftItems.length > 0,
    [allItem, leftItems.length]
  );

  const onAllCompleteRemove: MouseEventHandler = useCallback(() => {
    dispatcher(clearDone())
  }, [dispatcher]);

  const routeList: PathNames[] = useMemo(() => [
    { route: '/', name: "All" },
    { route: '/completed', name: "Completed" },
    { route: '/active', name: "Active" }
  ], []);

  return (
    <FilterPanel
      filterLinks={routeList}
      onAllCompletedRemove={onAllCompleteRemove}
      leftItems={leftItems.length}
      activeRoute={activeRoute}
      markItem={isCompletedExists}
    />
  );
}

export default NavigationPanelWrapper;