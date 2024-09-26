import { z } from "zod"

const lowerCaseRegex = /(?=.*[a-z])\w+/
const upperCaseRegex = /(?=.*[A-Z])\w+/
const numberRegex = /\d/
const specialCharcterRegex = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/

export const accountCredentialsFormValuesSchema = z
  .object({
    email: z.string().email(),
    newPassword: z
      .string({ required_error: "Password is required" })
      // We don't want to apply validation if password is empty
      // As we won't update password in that case
      .refine(
        (value) => value === "" || value.length >= 8,
        "Password must be at least 8 chars long",
      )
      .refine(
        (value) => value === "" || lowerCaseRegex.test(value),
        "Password must contain atleast a lowercase",
      )
      .refine(
        (value) => value === "" || upperCaseRegex.test(value),
        "Password must contain atleast an uppercase",
      )
      .refine(
        (value) => value === "" || numberRegex.test(value),
        "Password must contain atleast a number",
      )
      .refine(
        (value) => value === "" || specialCharcterRegex.test(value),
        "Password must contain atleast a special character",
      ),
    newPasswordConfirmation: z.string(),
  })
  .refine(
    ({ newPassword, newPasswordConfirmation }) =>
      newPassword === newPasswordConfirmation,
    {
      message: "Passwords don't match",
      path: ["newPasswordConfirmation"],
    },
  )

export type AccountCredentialsFormValues = z.infer<
  typeof accountCredentialsFormValuesSchema
>
