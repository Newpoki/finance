import { CurrencyCode, Locale, Timezone } from "./account-profile-types"

export const ACCOUNT_PROFILE_LOCALES: Record<Locale, Locale> = {
  "fr-FR": "fr-FR",
  "en-US": "en-US",
}

export const ACCOUNT_PROFILE_LANGUAGES_OPTIONS = [
  {
    value: ACCOUNT_PROFILE_LOCALES["fr-FR"],
    label: "Français",
  },
  {
    value: ACCOUNT_PROFILE_LOCALES["en-US"],
    label: "English (US)",
  },
] as const

export const ACCOUNT_PROFILE_CURRENCY_CODES: Record<
  CurrencyCode,
  CurrencyCode
> = {
  EUR: "EUR",
  USD: "USD",
}

export const ACCOUNT_PROFILE_TIMEZONES: Record<Timezone, Timezone> = {
  "Europe/Paris": "Europe/Paris",
  "America/Santiago": "America/Santiago",
}

export const ACCOUNT_PROFILE_TIMEZONES_OPTIONS = [
  {
    value: ACCOUNT_PROFILE_TIMEZONES["Europe/Paris"],
    label: "Europe/Paris",
  },
  {
    value: ACCOUNT_PROFILE_TIMEZONES["America/Santiago"],
    label: "America/Santiago",
  },
]
