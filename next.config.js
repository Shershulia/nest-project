/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['nest-test-next.s3.amazonaws.com'],
  },
}

module.exports = nextConfig
