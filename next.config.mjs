/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://images.unsplash.com https://vupqtpngeogrmcyrtnam.supabase.co https://maps.googleapis.com https://maps.gstatic.com https://*.googleusercontent.com",
              "font-src 'self'",
              "connect-src 'self' https://vupqtpngeogrmcyrtnam.supabase.co https://www.google-analytics.com https://maps.googleapis.com",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
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
