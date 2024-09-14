// TODO Use locale and currency from user
export const formatCents = (
  cents: number,
  locale = "fr-FR",
  currency = "EUR",
) => {
  // Convert cents to the main currency unit
  const amount = cents / 100

  // Format the amount as currency
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    signDisplay: "exceptZero",
  }).format(amount)
}
