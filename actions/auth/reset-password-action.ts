'use server'

import { ErrorResponSchema, ResetPasswordSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: string
    data: {
        password: string,
        password_confirmation: string
    }
}

export async function resetPassword(token: string, prevState:  ActionStateType, formData: FormData){

    
    const resetPasswordInput = {
        password: formData.get('password') as string,
        password_confirmation: formData.get('password_confirmation') as string
    }

    const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput)

    if (!resetPassword.success) {
        return {
            errors: resetPassword.error.issues
                .map((issue) => issue.message)
                .filter((msg): msg is string => Boolean(msg)), // ✅ Filtra undefined
            success: '',
            data: resetPasswordInput
        }
    }

    const url = `${process.env.API_URL}/auth/reset-password/${token}`;

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            ...resetPasswordInput
        })
    })

    const json = await req.json()
    if (!req.ok) {
        const { error } = ErrorResponSchema.parse(json)
        return {
            errors: [error].filter((e): e is string => Boolean(e)), // ✅ filtra undefined
            success: '',
            data: {
                password: '',
                password_confirmation: ''
            }
        }
    }
    const success = SuccessSchema.parse(json)
    return {
        errors: [],
        success,
        data : {
            password:'',
            password_confirmation:''
        }
    }
}