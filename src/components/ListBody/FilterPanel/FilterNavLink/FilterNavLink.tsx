import classNames from 'classnames';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import style from './FilterNavLink.module.sass';
import { useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';

type PathNames = {
  id: string,
  route: string,
  name: string
}

export default function FilterNavLink() {
  const router: NextRouter = useRouter();

  const routeList: PathNames[] = useMemo(() => [
    { route: '/', name: "All", id: nanoid()},
    { route: '/completed', name: "Completed", id: nanoid() },
    { route: '/active', name: "Active", id: nanoid() }
  ], []);

  const linkClass = useCallback((route: string) => {
    return classNames(
      { [style.active]: router.route === route }
    )
  }, [])

  return (
    <ul className={style.listForm}>
      {routeList.map((path: PathNames) => {
        return (
          <li key={path.id}>
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