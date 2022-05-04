/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/studio',
        destination: 'https://simonswebsite.sanity.studio/desk/',
        permanent: true,
        basePath: false,
      },
    ]
  },
}






module.exports = nextConfig
