import { CurrencyCode } from "./currency-types"

type FormatsCentsParamsAllowedOptions = Partial<
  Omit<
    Intl.NumberFormatOptions,
    // We're forcing "currency" display here
    | "style"
    // Renaiming it "currencyCode"
    | "currency"
  >
>

type FormatCentsParams = FormatsCentsParamsAllowedOptions & {
  cents: number
  locale: string
  currencyCode: CurrencyCode
}

export const formatCents = ({
  cents,
  locale,
  currencyCode,
  ...options
}: FormatCentsParams) => {
  // Converting back cents to real value
  const amount = cents / 100

  return new Intl.NumberFormat(locale, {
    ...options,
    style: "currency",
    signDisplay: options.signDisplay ?? "exceptZero",
    currency: currencyCode,
  }).format(amount)
}
