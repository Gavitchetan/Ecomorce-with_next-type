// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


const { Domain } = require('domain')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com', 'm.media-amazon.com', 'lh3.googleusercontent.com']
    }
}

module.exports = nextConfig


