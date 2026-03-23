/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vupqtpngeogrmcyrtnam.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Cache optimized images for 30 days (default is 60s)
    minimumCacheTTL: 2592000,
    // Generate smaller file sizes with modern formats
    formats: ["image/avif", "image/webp"],
    // Limit generated sizes to what we actually use
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [56, 128, 256, 384],
  },
};
export default nextConfig;
