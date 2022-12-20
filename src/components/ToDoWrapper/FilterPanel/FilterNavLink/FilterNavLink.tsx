import classNames from 'classnames';
import Link from 'next/link';
import style from './FilterNavLink.module.sass';
import { useCallback } from 'react';
import React from 'react';
import { PathNames } from './FilterNavLink.types';

interface FilterNavLinkType {
  filterItems: PathNames[],
  activeRoute: string
}

function FilterNavLink({ filterItems, activeRoute }: FilterNavLinkType) {

  const linkMap = useCallback(() => {
    return filterItems.map((filterItem: PathNames, i: number) => {
      return (
        <li key={i}>
          <Link
            href={filterItem.route}
            className={classNames(
              { [style.active]: activeRoute === filterItem.route }
            )}>
            {filterItem.name}
          </Link>
        </li>
      )
    })
  }, [filterItems, activeRoute]);

  return (
    <ul className={style.listForm}>
      {linkMap()}
    </ul>
  )
};

export default React.memo(FilterNavLink);