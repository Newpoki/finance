import { Locale } from "@/app/app/profile/profile-types"
import { CurrencyCode } from "./currency-types"

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
