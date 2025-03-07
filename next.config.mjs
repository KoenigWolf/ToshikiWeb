/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
  },

  // TypeScript type checking - ビルドエラーを無視
  typescript: {
    ignoreBuildErrors: true,
  },

  // ESLint configuration - ビルドエラーを無視
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig; 