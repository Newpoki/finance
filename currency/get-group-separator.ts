import {
  CurrencyCode,
  Locale,
} from "@/app/app/account/profile/account-profile-types"

export const getGroupSeparator = (
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
    .find((part) => part.type === "group")

  if (parts == null) {
    throw new Error("Group separator not found for provided locale")
  }

  return parts.value
}
