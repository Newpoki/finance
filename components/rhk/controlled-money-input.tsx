import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form"
import { FormControl, FormItem, FormLabel } from "../ui/form"
import { Input, InputProps } from "../ui/input"
import { FormMessage } from "../form-message"
import { useCallback, useMemo } from "react"
import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format"
import { getCurrencySymbol } from "@/currency/get-currency-symbol"
import { getGroupSeparator } from "@/currency/get-group-separator"
import {
  CurrencyCode,
  Locale,
} from "@/app/app/account/profile/account-profile-types"
import { getDecimalSeparator } from "@/currency/get-decimal-separator"

type ControlledMoneyInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  NumericFormatProps<InputProps> & {
    label?: string
    helperText?: string
    locale: Locale
    currencyCode: CurrencyCode
  }

export function ControlledMoneyInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  disabled,
  label,
  helperText,
  locale,
  currencyCode,
  suffix,
  placeholder,
  thousandSeparator,
  decimalSeparator,
  allowNegative = false,
  allowLeadingZeros = false,
  ...others
}: ControlledMoneyInputProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ref: _ref, ...othersField },
    fieldState: { error },
  } = useController({
    name,
    control,
    // Using disabled here create an error in chrome console
    // https://github.com/orgs/react-hook-form/discussions/10964#discussioncomment-10094733
    disabled: undefined,
  })

  const displayedCurrencySymbol = useMemo(
    () => getCurrencySymbol(locale, currencyCode),
    [currencyCode, locale],
  )

  const displayedGroupSeparator = useMemo(
    () => getGroupSeparator(locale, currencyCode),
    [currencyCode, locale],
  )

  const displayedDecimalSeparator = useMemo(
    () => getDecimalSeparator(locale, currencyCode),
    [currencyCode, locale],
  )

  const handleValueChange = useCallback(
    (values: NumberFormatValues) => {
      onChange(values.floatValue)
    },
    [onChange],
  )

  return (
    <FormItem>
      {label != null && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <NumericFormat
          {...othersField}
          {...others}
          customInput={Input}
          suffix={suffix ?? ` ${displayedCurrencySymbol}`}
          placeholder={
            placeholder ??
            `20${displayedDecimalSeparator}42 ${displayedCurrencySymbol}`
          }
          disabled={disabled}
          thousandSeparator={thousandSeparator ?? displayedGroupSeparator}
          decimalSeparator={decimalSeparator ?? displayedDecimalSeparator}
          defaultValue={value}
          allowNegative={allowNegative}
          onValueChange={handleValueChange}
          allowLeadingZeros={allowLeadingZeros}
        />
      </FormControl>

      <FormMessage
        type={error?.message != null ? "error" : "default"}
        content={error?.message ?? helperText}
      />
    </FormItem>
  )
}
