/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: true,
  compress: true,
  swcMinify: true,
  images: {
    loader: "custom",
    loaderFile: "./src/loader/image.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]

  },
};

export default nextConfig;
