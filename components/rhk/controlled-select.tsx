import {
  FieldPath,
  FieldValues,
  PathValue,
  useController,
  UseControllerProps,
} from "react-hook-form"
import { FormControl, FormItem, FormLabel } from "../ui/form"
import { FormMessage } from "../form-message"
import { Fragment, useMemo } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

type Option<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOptionValue extends PathValue<TFieldValues, TName> = PathValue<
    TFieldValues,
    TName
  >,
> = {
  label: string
  value: TOptionValue
}

type ControlledSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOptionValue extends PathValue<TFieldValues, TName> = PathValue<
    TFieldValues,
    TName
  >,
> = UseControllerProps<TFieldValues, TName> & {
  label?: string
  helperText?: string
  options: // So it can accept "as const" option
  | ReadonlyArray<Option<TFieldValues, TName, TOptionValue>>
    | Option<TFieldValues, TName, TOptionValue>[]
}

export function ControlledSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOptionValue extends PathValue<TFieldValues, TName> = PathValue<
    TFieldValues,
    TName
  >,
>({
  name,
  control,
  disabled,
  label,
  helperText,
  options,
}: ControlledSelectProps<TFieldValues, TName, TOptionValue>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, disabled })

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === field.value)
  }, [field.value, options])

  if (selectedOption == null && field.value != null) {
    throw new Error(`No option found with value ${field.value}`)
  }

  return (
    <FormItem aria-disabled={disabled}>
      {label != null && <FormLabel aria-disabled={disabled}>{label}</FormLabel>}
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger disabled={disabled} className="w-full">
            <SelectValue>{selectedOption?.label}</SelectValue>
          </SelectTrigger>

          <SelectContent sideOffset={8}>
            {options.map((option) => (
              <Fragment key={option.value}>
                <SelectItem value={option.value}>{option.label}</SelectItem>
                <SelectSeparator className="last:hidden" />
              </Fragment>
            ))}
          </SelectContent>
        </Select>
      </FormControl>

      <FormMessage
        type={error?.message != null ? "error" : "default"}
        content={error?.message ?? helperText}
      />
    </FormItem>
  )
}
