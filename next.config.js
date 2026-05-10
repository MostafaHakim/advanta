/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "advanta-three.vercel.app",
          },
        ],
        destination: "https://www.advantascale.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
