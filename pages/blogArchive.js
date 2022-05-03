import Link from 'next/link'
import groq from 'groq'
import {readClient} from '../client'
import { urlFor } from './post/[slug]'
import { useState } from 'react'
import Head from 'next/head'

export async function getStaticProps() {
  const posts = await readClient.fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    {
      mainImage,
      slug,
      title,
      publishedAt,
      description,
      _id,
      "body": body[0].children[0].text,
    }
  `)
 
  return {
    props: {
      posts
    }
  }
}


const BlogArchive = ({posts}) => {
  //const [showAll, toggleShowAll] = useState(false)
    // Eventually we want a button to toggle show all posts
    return (
      <>
      <Head>
        <title>Archive | Ansley</title>
        <meta name='keywords'/>
      </Head>
      <div className='blog-archive-grid'>
      {
        posts.length > 0 ? posts.map(
          //Initialize these variables - can do it like above too
          ({ _id, title, slug, publishedAt, mainImage, description}, index) =>
          //These things all come from the query into getStaticProps-unpacked and initialized for use in .map - second argument index self explanatory
          <Link className= 'link-to-post' href="/post/[slug]" as={`/post/${slug.current}`} key = {_id}> 
            <a className={`blog-render S${index}`}>
              {{slug} ?
              <div className='blog-render-title'>
                  <a>{title}</a>{' '}
              </div>
             : null}
             {{slug} ? 
             <>
             {description &&   
             <p className='blog-render-description-text'>{description}</p>
            }
            {publishedAt &&
             <h2 className='blog-render-date'>{(new Date(publishedAt).toDateString().slice(4))}</h2>
            }
             </>
            : null}
            {mainImage &&
            <div className='blog-render-image-div'>              
                <img
                className='blog-render-image'
                src = {urlFor(mainImage)
                      .width(288)
                      .url()}
                alt = {`$article's picture`}                  
                />
              </div>}
              
            </a>
          </Link>
        ): 'No Posts Yet'
    }
  </div>
    </>)
      }
      
//



export default BlogArchive