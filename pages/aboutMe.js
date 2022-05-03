import React from 'react'
import { PortableText } from '@portabletext/react'
import { readClient} from '../client'
import groq from 'groq'
import { urlFor } from './post/[slug]'
import Head from 'next/head'
import styles from "../styles/aboutMe.module.css"
import Link from 'next/link'
import Image from 'next/image'


export async function getStaticProps(){
    //IMPORTANT -> SPECIFY [0] so that we know it's the first Simon Needle
    const authorObject = await readClient.fetch(groq`
    *[_type == "author" && name == "Simon Needle"][0]{
      bio,
        name,
    }
    `)
    return {
        props: {
            authorObject
        }
    }
}





const aboutMe = ({authorObject}) => {
    const {
        name,
        bio,
    } = authorObject
  return (
    <>
    <Head>
      <title>About Me</title>
      <meta name='keywords'/>
    </Head>
    <div className={styles.aboutMeInnerDiv}>
        <h1 className={styles.aboutTitle}>About me</h1>
        <div className={styles.aboutContactBox}>
          <h2 className={styles.aboutContactBoxH2}> Contact me at: </h2>
          <h3 className={styles.aboutContactBoxH3}> Email:
          <Link href = "mailto:simon.needlepoint@gmail.com" alt = "gmail.com">
            <a className={styles.aboutContactBoxA}> simon.needlepoint@gmail.com</a>
          </Link>
          </h3>
          <h3 className={styles.aboutContactBoxH3}> Book a lesson:
          <Link href="https://www.rangr.org/ansleymusic">
            <a className={styles.aboutContactBoxA}>https://www.rangr.org/ansleymusic</a>
          </Link>
          </h3>
        </div>
        
        <div className={styles.aboutImageDiv}>
          <Image
            src = '/Simon_portrait.png'
            height={500}
            width= {500}
            alt=''
            priority
           /> 
        </div>
        {bio &&
        <div className={styles.aboutPortableTextDiv}>
            <PortableText
            className = {styles.aboutPortableTextDiv}
            value = {bio}
            />
        </div>}
        <div className={styles.aboutIconsDiv}>
            <span className={styles.aboutSocialMediaIcon}>
              <Link href="https://www.linkedin.com/in/needlepoint-music/">
                <Image 
                src = '/linkedin_icon_simonsweb.png'
                width={40}
                height={40}
                alt=''
                priority/>
                </Link>
            </span>
            <span className={styles.aboutSocialMediaIcon}>
              <Link href = "https://twitter.com/simonsaid6">
                <Image 
                src = '/twitter_icon_simonsweb2.png'
                width={40}
                height={40}
                alt=''
                priority/>
                </Link>
            </span>
            <span className={styles.aboutSocialMediaIcon}>
              <Link href= "https://www.facebook.com/AnsleyMusicStudio/">
                <Image 
                src = '/facebook_icon_simonsweb2.png'
                width={40}
                height={40}
                alt=''
                priority/>
              </Link>  
            </span>
          </div>
        </div>
</>
)
}

export default aboutMe