import { Box, Typography } from '@mui/material';
import React, { MouseEventHandler, useMemo } from 'react'
import style from "./FilterPanel.module.sass"
import FilterNavLink from './FilterNavLink/FilterNavLink';
import classNames from 'classnames';
import { PathNames } from './FilterNavLink/FilterNavLink.types';

interface FilterPanelType {
  filterLinks: PathNames[],
  onAllCompletedRemove: MouseEventHandler,
  leftItems: number,
  activeRoute: string,
  markItem: boolean
}

function FilterPanel({
  activeRoute,
  filterLinks,
  onAllCompletedRemove,
  leftItems,
  markItem
}: FilterPanelType) {

  let cleanerButtonClass = useMemo(() => classNames(style.doneCleaner, {
    [style.doneCleanerHide]: markItem
  }), []);

  return (
    <nav className={style.filterBox}>
      <Box>
        <Typography
          className={style.leftNumber}
          variant='subtitle1'
        >
          {leftItems} items left
        </Typography>
      </Box >
      <FilterNavLink filterItems={filterLinks} activeRoute={activeRoute} />
      <Box className={style.doneCleanerBox}>
        <span
          onClick={onAllCompletedRemove}
          className={cleanerButtonClass}>
          Clear completed
        </span>
      </Box>
    </nav >
  )
}

export default React.memo(FilterPanel);