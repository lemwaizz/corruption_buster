/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "www.parliament.go.ke",
      },
    ],
  },
};

export default nextConfig;
