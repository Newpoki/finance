import { z } from "zod"

export const signinFormValuesSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
})

export type SigninFormValues = z.infer<typeof signinFormValuesSchema>
