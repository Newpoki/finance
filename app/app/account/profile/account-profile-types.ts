import { z } from "zod"
import { fetchCurrentUserProfile } from "./fetch-current-user-profile"
import { Database } from "@/database.types"

export type Profile = Awaited<ReturnType<typeof fetchCurrentUserProfile>>

export type Locale = Database["public"]["Enums"]["locales"]

export const accountProfileFormValuesSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthdate: z.date().nullable(),
})

export type AccountProfileFormValues = z.infer<
  typeof accountProfileFormValuesSchema
>
