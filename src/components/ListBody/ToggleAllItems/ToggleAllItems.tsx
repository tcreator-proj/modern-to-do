import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import classNames from 'classnames'
import React, { FormEventHandler } from 'react'
import style from './ToggleAllItems.module.sass';

interface ToggleTypes {
  isEverythingCompleted: boolean,
  onChangeAllHandler: FormEventHandler
}

function ToggleAllItems({ isEverythingCompleted, onChangeAllHandler }: ToggleTypes) {
  
  const classNameStyles = classNames(
    style.arrowDown,
    { [style.allComplete]: isEverythingCompleted }
  )
  
  return (
    <section className={classNameStyles}>
      <ToggleButtonGroup
        color="primary"
        value='{alignment}'
        exclusive
        onChange={onChangeAllHandler}
        aria-label="Platform"
      >
        <ToggleButton value="web"></ToggleButton>
      </ToggleButtonGroup>
    </section>
  )
}

export default React.memo(ToggleAllItems);