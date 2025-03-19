import { url } from "inspector";

const config ={
    env:{
        imagekit:{
            publicKey:process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
            urlEndpoint:process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
            privatKey:process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY
        }
    }
}

export default config;