import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form"
import { FormControl, FormItem, FormLabel } from "../ui/form"
import { Input, InputProps } from "../ui/input"
import { FormMessage } from "../form-message"
import { useCallback } from "react"
import {
  NumberFormatValues,
  PatternFormat,
  PatternFormatProps,
} from "react-number-format"

type ControlledDateInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<PatternFormatProps<InputProps>, "format"> & {
    label?: string
    helperText?: string
    format?: string
  }

export function ControlledDateInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  disabled,
  label,
  helperText,
  format = "####-##-##",
  placeholder = "YYYY-MM-DD",
  mask = ["Y", "Y", "Y", "Y", "M", "M", "D", "D"],
  ...others
}: ControlledDateInputProps<TFieldValues, TName>) {
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

  const handleValueChange = useCallback(
    (values: NumberFormatValues) => {
      onChange(values.formattedValue)
    },
    [onChange],
  )

  console.log({ value })

  return (
    <FormItem>
      {label != null && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <PatternFormat
          {...othersField}
          {...others}
          format={format}
          placeholder={placeholder}
          mask={mask}
          disabled={disabled}
          customInput={Input}
          onValueChange={handleValueChange}
          value={value}
        />
      </FormControl>

      <FormMessage
        type={error?.message != null ? "error" : "default"}
        content={error?.message ?? helperText}
      />
    </FormItem>
  )
}
