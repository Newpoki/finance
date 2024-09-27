import { z } from "zod"
import { fetchCurrentUserProfile } from "./fetch-current-user-profile"
import { Database } from "@/database.types"
import {
  ACCOUNT_PROFILE_CURRENCY_CODES,
  ACCOUNT_PROFILE_LOCALES,
  ACCOUNT_PROFILE_TIMEZONES,
} from "./account-profile-constants"

export type Profile = Awaited<ReturnType<typeof fetchCurrentUserProfile>>

export type CurrencyCode = Database["public"]["Enums"]["currency_codes"]

export type Timezone = Database["public"]["Enums"]["timezones"]

export type Locale = Database["public"]["Enums"]["locales"]

const availableLocales = [
  ACCOUNT_PROFILE_LOCALES["fr-FR"],
  ACCOUNT_PROFILE_LOCALES["en-US"],
] as const

const availableCurrencyCodes = [
  ACCOUNT_PROFILE_CURRENCY_CODES.EUR,
  ACCOUNT_PROFILE_CURRENCY_CODES.USD,
] as const

const availableTimezones = [
  ACCOUNT_PROFILE_TIMEZONES["Europe/Paris"],
  ACCOUNT_PROFILE_TIMEZONES["America/Santiago"],
] as const

export const accountProfileFormValuesSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthdate: z.date().nullable(),
  locale: z.enum(availableLocales),
  currencyCode: z.enum(availableCurrencyCodes),
  timezone: z.enum(availableTimezones),
})

export type AccountProfileFormValues = z.infer<
  typeof accountProfileFormValuesSchema
>

export const getAccountProfileDeleteFormValuesSchema = (email: string) => {
  return z.object({
    confirmEmail: z
      .string()
      .email()
      .refine((value) => value === email, {
        message: "Email must be the same",
      }),
  })
}

export type AccountProfileDeleteFormValues = z.infer<
  ReturnType<typeof getAccountProfileDeleteFormValuesSchema>
>
