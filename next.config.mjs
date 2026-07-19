import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "i.ibb.co",
            },
            {
                protocol: "https",
                hostname: "api.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "api.bumrungraddiscover.com",
            },
            {
                protocol: "https",
                hostname: "api.discoverinternationalmedicalservice.com",
            }
        ],
    },
};

export default withNextIntl(nextConfig);
