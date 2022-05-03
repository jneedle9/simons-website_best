import Link from 'next/link'
import React from 'react'
import styles from '../styles/Header.module.css'

function Header() {
  return (
    <nav className={styles.headerGrid}>
      <ul className={styles.headerLinkBox}>
        <Link className = '' href = '/'>
          <a className={styles.headerLink}>
            Home
          </a>
        </Link>
        <Link href = '/blogArchive'>
          <a className={styles.headerLink}>
            Archive
          </a>
        </Link>
        <Link href = '/aboutMe'>
          <a className={styles.headerLink}>
            About Me
          </a>
        </Link>
      </ul>        
    </nav>
  )
}

export default Header