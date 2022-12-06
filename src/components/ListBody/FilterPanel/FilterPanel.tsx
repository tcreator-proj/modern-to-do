import Link from 'next/link'
import React from 'react'

function FilterPanel() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/completed">About Us</Link>
      </li>
      <li>
        <Link href="/active">Active</Link>
      </li>
    </ul>
  )
}

export default FilterPanel