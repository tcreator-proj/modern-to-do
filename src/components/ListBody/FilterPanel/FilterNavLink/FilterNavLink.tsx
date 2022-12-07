import classNames from 'classnames';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import style from './FilterNavLink.module.sass';
import { useCallback } from 'react';

type PathNames = {
  route: string,
  name: string
}

export default function FilterNavLink() {
  const router: NextRouter = useRouter();

  const routeList: PathNames[] = [
    { route: '/', name: "All" },
    { route: '/completed', name: "Completed" },
    { route: '/active', name: "Active" }
  ];

  const linkClass = useCallback((route: string) => {
    return classNames(
      { [style.active]: router.route === route }
    )
  }, [])

  return (
    <ul className={style.listForm}>
      {routeList.map((path: PathNames) => {
        return (
          <li>
            <Link href={path.route}
              className={linkClass(path.route)}>
              {path.name}
            </Link>
          </li>
        )
      })}
    </ul>

  )
}