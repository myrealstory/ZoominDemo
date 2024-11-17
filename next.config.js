/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: false,
  images: {
    loader: 'custom',
    loaderFile: './src/loader/image.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  async redirects () {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
