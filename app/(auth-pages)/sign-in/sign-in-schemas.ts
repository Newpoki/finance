import { z } from "zod"

export const signinFormValuesSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type SigninFormValues = z.infer<typeof signinFormValuesSchema>
