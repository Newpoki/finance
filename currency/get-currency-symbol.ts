import {
  CurrencyCode,
  Locale,
} from "@/app/app/account/profile/account-profile-types"

export const getCurrencySymbol = (locale: Locale, currency: CurrencyCode) =>
  (0)
    .toLocaleString(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim()
