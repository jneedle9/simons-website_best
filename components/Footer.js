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
            <Image 
            src = '/linkedin_icon_simonsweb.png'
            width={40}
            height={40}
            priority/>
            </Link>
          </span>
          <span className={styles.socialMediaIcon}>
          <Link href = "https://twitter.com/simonsaid6">
            <Image 
            src = '/twitter_icon_simonsweb2.png'
            width={40}
            height={40}
            priority/>
            </Link>
          </span>
          <span className={styles.socialMediaIcon}>
          <Link href= "https://www.facebook.com/AnsleyMusicStudio/">
            <Image 
            src = '/facebook_icon_simonsweb2.png'
            width={40}
            height={40}
            priority/>
          </Link>  
          </span>
        </div>
      </div>
        <div className= {styles.footerTextLinksOverallBox}>
          <div className={styles.columnOneBox}>
          <Link href = '/'>
          <h1 className={styles.columnOneH1}>Home</h1>
          </Link>
          <Link href= './blogArchive'>
          <p className= {styles.columnOneItem}>Blog Archive</p>
          </Link>
          <Link href= './aboutMe'>
          <p className= {styles.columnOneItem}>About Me</p>
          </Link>
        </div>
      </div>    
    </div>
  )
}

export default Footer