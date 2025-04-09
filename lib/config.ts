import { url } from "inspector";

const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        imagekit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_URL_ENDPOINT!,
            privatKey: process.env.IMAGEKIT_PRIVATE_KEY!
        },
        databaseURL: process.env.DATABASE_URL!,
        upstash: {
            rdisUrl: process.env.UPSTASH_REDIS_URL,
            redisToken: process.env.UPSTASH_REDIS_TOKEN,
            qstashUrl: process.env.QSTASH_URL,
            qstashToken: process.env.QSTASH_TOKEN,
        },

    }
}

export default config;