import { z } from "zod";


export const SignUpSchema = z.object({
    name: z.string(),
    username: z.string().min(6).email(),
    password: z.string().min(6)
})

export const SignInSchema = z.object({
    username: z.string(),
    password: z.string()
})