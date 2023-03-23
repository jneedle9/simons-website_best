import groq from 'groq'
import React from 'react'
import { readClient} from '../client'
import Link from 'next/link'
import { urlFor } from './post/[slug]'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Head from 'next/head'




export async function getStaticProps(){ /** fetching all this info from sanity using their backend language called groq */
  const posts = await readClient.fetch(groq` 
  *[_type == "post" && publishedAt < now()] | order(publishedAt desc)[0...3]
  {
    mainImage,
    "slug": slug.current,
    title,
    publishedAt,
    description,
    _id,
    "body": body[0].children[0].text,
    "estimatedWordCount": round(length(pt::text(body)) / 5),
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
  }
`)
  return {
    props: {
      posts
    }
  }
}


const index = ({posts}) => {
  return (
  <>
    <Head>
    <title>Homepage | Ansley</title>
    <meta name='keywords'/>
    </Head>
  <div className='homepage-grid-container'> 
    <div className='homepage-header-div'>
      <h1 className='homepage-header-title'>
        Header Text
      </h1>
      <h1 className='homepage-header-subtitle'>
        Subtitle header text
      </h1>
  </div>
  <h3 className='homepage-announce-blog-cards'>Recent Blog Posts</h3>  
  <div className='blog-cards-overall-flex'> {/* flexbox for blog cards */}
  { posts.length > 0 ? posts.map( /** if there are more than 0 posts grab the attributes fetched earlier */
    ({mainImage,
      slug,
      title,
      publishedAt,
      description,
      _id,
      estimatedReadingTime,
      estimatedWordCount}) =>
      <Link href = {`/post/${slug}`} key = {_id}> {/* gives a link based on the slug */}
        <a className='homepage-blog-cards-outer'>
          <div className='homepage-blog-cards-inner'>
          {mainImage && // conditional rendering for the following attributes
          <div className='homepage-blog-card-image-div'>
            <img
            src = {urlFor(mainImage)
            .width(360)
            .height(200)
            .url()}
            />
          </div>  }
          {title &&          
          <h1 className='homepage-blog-card-title'>{title}</h1>
          }
          {description &&
          <p className='homepage-blog-card-description'>
            {description}  
          </p>}
          {publishedAt &&
          <h2 className='homepage-blog-card-date'>
            {(new Date(publishedAt).toDateString().slice(4))}
          </h2>}
          {estimatedWordCount &&
            <span className='homepage-blog-card-estimated-reading-time'>
              {`${estimatedReadingTime} min read`}
            </span>}
          </div>
      </a>
    </Link>
      )
  : null
        }
      </div> 
    </div>
  </>)
}
  


export default index