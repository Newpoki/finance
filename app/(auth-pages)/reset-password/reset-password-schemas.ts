import { z } from "zod"

export const resetPasswordFormValuesSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    passwordConfirmation: z.string(),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "Passwords don't match",
      path: ["passwordConfirmation"],
    },
  )

export type ResetPasswordFormValues = z.infer<
  typeof resetPasswordFormValuesSchema
>
