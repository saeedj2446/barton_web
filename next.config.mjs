/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ["en", "fa", "ar"],
    defaultLocale: "en",
    localeDetection: true,
  },
};

export default nextConfig;
