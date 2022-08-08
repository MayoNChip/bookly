/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compilerOptions: {
    downlevelIteration: true,
  },
};

module.exports = nextConfig;
