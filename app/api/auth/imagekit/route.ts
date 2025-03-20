import config from "@/lib/config";
import ImageKit from "imagekit";


const imagekit = new ImageKit({
    publicKey: config.env.imagekit.publicKey,
    privateKey: config.env.imagekit.privatKey,
    urlEndpoint: config.env.imagekit.urlEndpoint
})