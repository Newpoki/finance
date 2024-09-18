type FormatDateParams = Intl.DateTimeFormatOptions & {
  date: string | number | Date
  locale: string
}

export const formatDate = ({
  date: rawDate,
  locale,
  ...options
}: FormatDateParams) => {
  const date = new Date(rawDate)

  return new Intl.DateTimeFormat(locale, {
    ...options,
    day: options.day ?? "numeric",
    month: options.month ?? "short",
    year: options.year ?? "numeric",
  }).format(date)
}
