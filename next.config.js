/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ...
  // other configs
  // ...
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    });
    return config;
  }
}

module.exports = nextConfig

