import Link from 'next/link'
import groq from 'groq'
import client from '../client'
import { urlFor } from './post/[slug]'
import { useState } from 'react'

export async function getStaticProps() {
  const posts = await client.fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    {
      mainImage,
      slug,
      title,
      publishedAt,
      description,
      "body": body[0].children[0].text,
    }
  `)
  return {
    props: {
      posts
    }
  }
}


const Index = ({posts}) => {
  const [showAll, toggleShowAll] = useState(false)
    return (
        posts.length > 0 ? posts.map(
          //Initialize these variables - can do it like above too
          ({ _id, title, slug, publishedAt, mainImage, description}, index) =>
          //These things all come from the query into getStaticProps-unpacked and initialized for use in .map - second argument index self explanatory
          <Link className= 'link-to-post' href="/post/[slug]" as={`/post/${slug.current}`}>
            <div className={`blog-render S${index}`} key={_id}>
              {{slug} ?
              <div className='blog-render-title'>
                  <a>{title}</a>{' '}
              </div>
             : null}
             {{slug} ? 
             <>   
             <p className='blog-render-description-text'>{description}</p>
             <h2 className='blog-render-date'>{(new Date(publishedAt).toDateString().slice(4))}</h2>
             </>
            : null}
            {{mainImage} ?
            <div className='blog-render-image-div'>              
                <img
                className='blog-render-image'
                src = {urlFor(mainImage)
                      .width(288)
                      .url()}
                alt = {`$article's picture`}                  
                />
              </div>: null}
            </div>
          </Link>
        ): 'No Posts Yet')
      }
      




export default Index