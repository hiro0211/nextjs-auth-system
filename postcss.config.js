/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['ilauhlxytqtrbvjxmhne.supabase.co'],
  },
};

module.exports = nextConfig;
