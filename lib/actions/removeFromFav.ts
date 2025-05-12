import { db } from "@/database/drizzle";
import { favorites } from "@/database/schema";
import { eq } from "drizzle-orm";

interface Props {
    id:string;
}

const removeFromFavorites = async ({ id }: Props) => {
  try {
    await db.delete(favorites).where(eq(favorites.id, id));
    
    console.log("Removed from favorites");
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
}


 export default removeFromFavorites;