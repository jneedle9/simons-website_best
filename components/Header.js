import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='header-grid'>
        <Link className = '' href = '/'>
          <h1 className='header-grid-item'>
            This is the Header
          </h1>
        </Link>
    </div>
  )
}

export default Header