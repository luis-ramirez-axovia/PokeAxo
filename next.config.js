/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_DIRECTION_URL: process.env.NEXT_PUBLIC_API_DIRECTION_URL || 'http://localhost:1337',
  },
  reactStrictMode: true,
  swcMinify: true,
  // basePath: '/dist',
  compress: true,
  images: {
    domains: ['raw.githubusercontent.com', 'localhost', 'pokemon-strapi.herokuapp.com']
  },
  async redirects() {
    return [
      {
        source: '/hola',
        destination: '/hello', //https://pagedirection
        permanent: true,
      }
    ]
  }, 
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es',
  }
}

module.exports = nextConfig
