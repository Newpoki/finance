import { z } from "zod"

export type ForgotPasswordActionState = {
  root?: string
  fields?: Record<string, string>
}

export const forgotPasswordFormValuesSchema = z.object({
  email: z.string().email(),
})

export type ForgotPasswordFormValues = z.infer<
  typeof forgotPasswordFormValuesSchema
>
