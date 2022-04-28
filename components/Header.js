import Link from 'next/link'
import React from 'react'
import styles from '../styles/Header.module.css'

function Header() {
  return (
    <nav className={styles.headerGrid}>
      <ul className={styles.headerLinkBox}>
        <Link className = '' href = '/'>
          <li className={styles.headerLink}>
            Home
          </li>
        </Link>
        <Link href = '/blogArchive'>
          <li className={styles.headerLink}>
            Archive
          </li>
        </Link>
        <Link href = '/aboutMe'>
          <li className={styles.headerLink}>
            About Me
          </li>
        </Link>
      </ul>        
    </nav>
  )
}

export default Header