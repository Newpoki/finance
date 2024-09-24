import { z } from "zod"

export const profileAccountDetailsFormValuesSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthdate: z.date().nullable(),
})

export type ProfileAccountDetailsFormValues = z.infer<
  typeof profileAccountDetailsFormValuesSchema
>
