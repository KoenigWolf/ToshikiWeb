/** @type {import('next').NextConfig} */
const nextConfig = {
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