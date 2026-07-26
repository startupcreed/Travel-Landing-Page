/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/popular',
        destination: '/kerala-tour-packages/4-nights-5-days-kerala-tour-package',
        permanent: true,
      },
      {
        source: '/popular-kerala',
        destination: '/kerala-tour-packages/4-nights-5-days-kerala-tour-package',
        permanent: true,
      },
      {
        source: '/amazing',
        destination: '/kerala-tour-packages/5-nights-6-days-munnar-thekkady-alleppey-package',
        permanent: true,
      },
      {
        source: '/amazing-kerala',
        destination: '/kerala-tour-packages/5-nights-6-days-munnar-thekkady-alleppey-package',
        permanent: true,
      },
      {
        source: '/romantic',
        destination: '/kerala-tour-packages/kerala-honeymoon-package-with-houseboat',
        permanent: true,
      },
      {
        source: '/romantic-kerala',
        destination: '/kerala-tour-packages/kerala-honeymoon-package-with-houseboat',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig
