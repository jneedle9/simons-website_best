import sanityClient from '@sanity/client'

export const writeClient = sanityClient({
  projectId: 'y4xpw2ks', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: false, // `false` if you want to ensure fresh data
  token: process.env.SANITY_API_TOKEN,
})

export const readClient = sanityClient({
  projectId: 'y4xpw2ks', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2022-04-22'
})