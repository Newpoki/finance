// TODO Use locale from user

type FormatDateParamsConfig = {
  locale?: string
  options?: Intl.DateTimeFormatOptions
}

type FormatDateParams = [dateString: string, config?: FormatDateParamsConfig]

export const formatDate = (...params: FormatDateParams) => {
  const { locale = "fr-FR", options = {} } = params[1] ?? {}

  const date = new Date(params[0])

  const mergedOptions: Intl.DateTimeFormatOptions = {
    ...options,
    day: options.day ?? "numeric",
    month: options.month ?? "short",
    year: options.year ?? "numeric",
  }

  return new Intl.DateTimeFormat(locale, mergedOptions).format(date)
}
