
import ImageKit from "imagekit"
import dummyBooks from "./dummybooks.json"
import { db } from "./database/drizzle"
import { books } from "./database/schema"

const imageKit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
    try {
        const response = await imageKit.upload({
            file: url,
            fileName,
            folder,

        })
        return response.filePath
    } catch (error) {
        console.error("Error uploading to ImageKit:", error)
    }
}
const seed = async () => {
    console.log("Seeding database...")
    try {
        for (const book of dummyBooks) {
            const coverUrl = await uploadToImageKit(book.coverUrl,
                `${book.title}.jpg`,
                "/books/covers")
            const videoUrl = await uploadToImageKit(book.videoUrl,
                `${book.title}.mp4`,
                "/books/videos")
            await db.insert(books).values({
                ...book,
                coverUrl,
                videoUrl
            })
        }
    } catch (error) {
        console.error("Error seeding database:", error)
    }
}