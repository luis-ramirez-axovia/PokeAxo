/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    customKey: 'customValue',
  },
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
