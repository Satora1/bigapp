"use client";

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { signUp } from "@/lib/actions/auth";

const Page = () => (
    <AuthForm
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{
            email: "",
            password: "",
            fullName: "",
            vintedNickname: "",
            // universityCard: '',
            // universityId: 0,
        }}
        onSubmit={signUp}
    />
);

export default Page;