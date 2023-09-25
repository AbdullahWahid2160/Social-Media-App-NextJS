/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/login',
            permanent: true, // Set to true for permanent redirects
          },
        ];
      },
}

module.exports = nextConfig
