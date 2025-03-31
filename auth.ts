import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import { db } from "./database/drizzle"
import { users } from "./database/schema"
import { compare } from "bcryptjs"
export const { handlers, signIn, signOut, auth } = NextAuth(
    {
        session: {
            strategy: "jwt",
        },

        providers: [CredentialProvider({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const user = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials.email.toString()))
                    .limit(1)
                if (user.length === 0) return null;
                const isValidPassword = await compare(credentials.password.toString(), user[0].password)

            }
        })]
    }
)