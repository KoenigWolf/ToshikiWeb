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

  // 外部画像ドメインの許可設定
  images: {
    domains: ['opengraph.githubassets.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig; 