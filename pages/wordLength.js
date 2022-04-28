import React from 'react'
import groq from 'groq'
import { readClient, writeClient } from '../client'


export async function getStaticProps(){
    const posts = await readClient.fetch(groq`
    *[_type == "post"][0]{ 
      title,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ) 
    }
  `)
    return {
      props: {
        posts
      }
    }
  }
  // "estimatedWordCount": round(length(pt::text({body})) / 5),
  // "estimatedReadingTime": round(length(pt::text({body})) / 5 / 180), 





function wordLength({posts}) {
    const {
        numberOfCharacters,
        estimatedWordCount,
        estimatedReadingTime
    } = posts
    console.log(estimatedWordCount)
  return (
    <div><h1>{estimatedWordCount}</h1></div>
  )
}

export default wordLength