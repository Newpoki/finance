import { z } from "zod"

export type SigninActionState = {
  root?: string
  fields?: Record<string, string>
}

export const signinFormValuesSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
})

export type SigninFormValues = z.infer<typeof signinFormValuesSchema>
