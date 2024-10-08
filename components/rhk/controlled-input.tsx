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

export type ControlledInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  InputProps & {
    label?: string
    helperText?: string
  }

export function ControlledInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  name,
  control,
  onChange,
  onBlur,
  disabled,
  label,
  helperText,
  ...others
}: ControlledInputProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    // Using disabled here create an error in chrome console
    // https://github.com/orgs/react-hook-form/discussions/10964#discussioncomment-10094733
    disabled: undefined,
  })

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
      field.onChange(event)
    },
    [field, onChange],
  )

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(event)
      field.onBlur()
    },
    [field, onBlur],
  )

  return (
    <FormItem className={className}>
      {label != null && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Input
          {...field}
          {...others}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormControl>

      <FormMessage
        type={error?.message != null ? "error" : "default"}
        content={error?.message ?? helperText}
      />
    </FormItem>
  )
}
