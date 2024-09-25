export const ACCOUNT_PROFILE_LOCALES = {
  "fr-FR": "fr-FR",
  "en-US": "en-US",
} as const

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

export const ACCOUNT_PROFILE_CURRENCY_CODES = {
  EUR: "EUR",
  USD: "USD",
} as const

export const ACCOUNT_PROFILE_CURRENCIES_OPTIONS = [
  {
    value: ACCOUNT_PROFILE_CURRENCY_CODES.EUR,
    // TODO: Use utils to get currency symbol
    label: "Euro (€)",
  },
  {
    value: ACCOUNT_PROFILE_CURRENCY_CODES.USD,
    label: "US Dollar ($)",
  },
]

export const ACCOUNT_PROFILE_TIMEZONES = {
  "Europe/Paris": "Europe/Paris",
  "America/Santiago": "America/Santiago",
} as const

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
