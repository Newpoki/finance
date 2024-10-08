import {
  CurrencyCode,
  Locale,
} from "@/app/app/account/profile/account-profile-types"

export const getDecimalSeparator = (
  locale: Locale,
  currencyCode: CurrencyCode,
) => {
  // Could use any number as long as it trigger group separator
  const numberWithDecimalSeparator = 1000.1

  const parts = Intl.NumberFormat(locale, {
    currency: currencyCode,
    style: "currency",
  })
    .formatToParts(numberWithDecimalSeparator)
    .find((part) => part.type === "decimal")

  if (parts == null) {
    throw new Error("Decimal separator not found for provided locale")
  }

  return parts.value
}
