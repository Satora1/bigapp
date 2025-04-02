"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

const signInWithCredentials = async (params: Pick<AuthCredentials, "emial", | "password">,

) => {
    const { email, password } = params
    try {
        const reslt = await signIn("credentials", {
            email, password, redirect: false
        })
        if (reslt?.error) {
            return { success: false, error: reslt.error }
        }
        return { success: true }
    } catch (error) {
        console.log(error, "sign in error")
        return { success: false, error: "Sign in error" }
    }
}

const signUp = async (params: AuthCredentials) => {
    const { fullName, email, password, universityId, universityCard } = params
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
    if (existingUser.length > 0) {
        throw new Error("User already exists")
    }
    const hashedPassword = await hash(password, 10);
    try {
        await db.insert(users).values({
            fullName,
            email,
            password: hashedPassword,
            universityId,
            universityCard,
        })
        await signInWithCredentials({ emial, password })
        return { success: true }
    } catch (error) {
        console.log(error, "sign up error")
        return { success: false, error: "Signup error" }
    }
}