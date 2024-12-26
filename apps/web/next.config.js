/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://hyperhire-menu-production.up.railway.app/:path*',
      },
    ];
  },
};

export default nextConfig;
