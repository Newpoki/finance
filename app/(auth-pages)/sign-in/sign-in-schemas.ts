import { z } from "zod"

export type SigninActionState = {
  root?: string
  fields?: Record<string, string>
}

export const signinFormValuesSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type SigninFormValues = z.infer<typeof signinFormValuesSchema>
