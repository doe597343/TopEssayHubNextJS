const nextConfig = {
    env: {

        // NEXT_PUBLIC_BASE_URL: 'http://localhost:3000',
        // NEXT_PUBLIC_BASE_URL: 'https://topessayhub-nextjs-hnrt.vercel.app',
        // NEXT_PUBLIC_BASE_URL: 'https://topessayhub.netlify.app',
        NEXT_PUBLIC_WRITER_FILES_URL: 'https://writer-uploads.oss.nodechef.com',
        NEXT_PUBLIC_BASE_URL: process.env.NODE_ENV == 'production' ? 'https://topessayhub.com' : 'http://localhost:3000',
        NEXT_PUBLIC_API_URL: 'https://topessayhub-22051.nodechef.com',
        NEXT_PUBLIC_PROFILE_PIC_URL: 'https://customer-profiles-pics.oss.nodechef.com'
    },
    images: {
        domains: ['localhost'],
    },
    experimental: {
        nextScriptWorkers: true,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
    },

    async rewrites() {
        return [
            {
                source: '/order/:path*',
                destination: '/order/:path*',
            },
            {
                source: '/thankyou/:path*',
                destination: '/thankyou/:path*',
            },
            {
                source: '/:path*',
                destination: '/services/:path*',
            },
        ]
  },
}

module.exports = nextConfig