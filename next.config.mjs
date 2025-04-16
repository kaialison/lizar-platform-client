/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: "https",
              hostname: "**",
          },
      ],
      domains: ['*'],
  },
  env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
