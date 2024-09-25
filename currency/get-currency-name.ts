import {
  CurrencyCode,
  Locale,
} from "@/app/app/account/profile/account-profile-types"

export const getCurrencyName = (locale: Locale, currency: CurrencyCode) => {
  // Could use any number
  const numberWithDecimalSeparator = 425169

  const parts = Intl.NumberFormat(locale, {
    currency,
    currencyDisplay: "name",
    style: "currency",
  })
    .formatToParts(numberWithDecimalSeparator)
    .find((part) => part.type === "currency")

  if (parts == null) {
    throw new Error("Currency name not found for provided locale")
  }

  return parts.value
}
