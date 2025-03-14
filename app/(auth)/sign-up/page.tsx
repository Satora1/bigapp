import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
    return (
        <AuthForm type="SIGN_UP"
            schema={signUpSchema}
            defaultValues={{
                email: "",
                password: "",
                fullName: "",
                UniversityId: 0,
                universityCard: "",
            }}
            onSubmit={() => { }}
        />
    )
}

export default page