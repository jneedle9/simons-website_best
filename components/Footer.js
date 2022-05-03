import React from 'react'
import styles from '../styles/Footer.module.css'
import Link from 'next/link'
import Image from 'next/image'


function Footer() {
  return (
    <div className = {styles.footerOverallDiv}>
      <div className= {styles.iconLinksOverallBox}>
        <div className={styles.iconLinksInnerBox}>
          <span className={styles.socialMediaIcon}>
          <Link href="https://www.linkedin.com/in/needlepoint-music/">
            <a>
              <Image 
              src = '/linkedin_icon_simonsweb.png'
              width={40}
              height={40}
              alt=''
              priority/>
            </a>
            </Link>
          </span>
          <span className={styles.socialMediaIcon}>
          <Link href = "https://twitter.com/simonsaid6">
            <a>
              <Image 
              src = '/twitter_icon_simonsweb2.png'
              width={40}
              height={40}
              alt=''
              priority/>
            </a>
            </Link>
          </span>
          <span className={styles.socialMediaIcon}>
          <Link href= "https://www.facebook.com/AnsleyMusicStudio/">
            <a>
              <Image 
              src = '/facebook_icon_simonsweb2.png'
              width={40}
              height={40}
              alt=''
              priority/>
            </a>
          </Link>  
          </span>
        </div>
      </div>
        <div className= {styles.footerTextLinksOverallBox}>
          <div className={styles.columnOneBox}>
            <Link href = '/' className={styles.columnOneH1}>
              <a className={styles.columnOneH1}>Home</a>
            </Link>
            <Link href= '/blogArchive'>
              <a className= {styles.columnOneItem}>Blog Archive</a>
            </Link>
            <Link href= '/aboutMe'>
              <a className= {styles.columnOneItem}>About Me</a>
            </Link>
        </div>
      </div>    
    </div>
  )
}

export default Footer