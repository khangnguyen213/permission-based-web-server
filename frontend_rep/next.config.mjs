/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  reactStrictMode: false,
};

export default nextConfig;
