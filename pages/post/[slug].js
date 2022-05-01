// [slug].js
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import {PortableText} from '@portabletext/react'
import {readClient} from '../../client'
import styles from '../../styles/[slug].module.css'
import Head from 'next/head'
import Link from "next/link"


//Grab the slugs from sanity and use those to map out the paths for type post
// Is it only current slug?
// Fallback is ...complicated, see:
//https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
export async function getStaticPaths() {
  const paths = await readClient.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )
  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}


//Query extracting stuff to be used for getStaticProps (below)
const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  mainImage,
  description,
  body
}`


//"Pre-render at build-time using props returned from this function"
//https://nextjs.org/docs/api-reference/data-fetching/get-static-props
export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const innerRef = await readClient.fetch(query, { slug })
  return {
    props: {
      innerRef
    }
  }
}


export function urlFor (source) {
  return imageUrlBuilder(readClient).image(source)
}

//To be used for react component "Portable Text" 
//May not be working properly, no picture renders for post (not author)
const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(500).height(240).fit('max').auto('format')}
        />
      )
    }
  }
}

//{post} is from getStaticProps fetched from the query
//Portable text only renders the value so far
const Post = ({innerRef}) => {
  const {
    title = 'Missing title',
    name = 'Missing name',
    categories,
    authorImage,
    mainImage,
    body,
    description = []
  } = innerRef
  console.log(title)
  return (
    <>
    <Head>
    <title>{title} | Ansley</title>
    <meta name='keywords'/>
  </Head>
    <article className={styles.blogGridContainer}>
      <div className={styles.blogHeaderDiv}>
        <h1 className={styles.blogTitle}>{title}</h1>
        <h2 className={styles.blogDescription}>{description}</h2>
        <Link href = "../aboutMe">
          <span className={styles.blogAuthor}>By {name}</span>
        </Link>
      </div>
        {mainImage && (
          <div className={styles.blogImageDiv}>
            <img
            className={styles.blogImage}
            src = {urlFor(mainImage)
                  .width(759)
                  .url()}
            alt = {`$article's picture`}                  
            />
        </div>
      )}
      <div className={styles.blogPortableTextDiv}>
        <PortableText
          className= {styles.blogPortableText}
          value={body}
          components={ptComponents}
        />
      </div>
    </article>
  </>
  )
}



export default Post
