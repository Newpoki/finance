import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form"
import { FormControl, FormItem, FormLabel } from "../ui/form"
import { FormMessage } from "../form-message"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { formatDate } from "@/date/format-date"
import { CalendarIcon } from "lucide-react"
import { Calendar, CalendarProps } from "../ui/calendar"

type ControlledDayPickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  CalendarProps & {
    label?: string
    helperText?: string
    // Must specify mode, otherwise component is totaly broken
    mode: Required<CalendarProps["mode"]>
  }

export function ControlledDayPicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  name,
  control,
  disabled,
  label,
  helperText,
  mode,
}: ControlledDayPickerProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, disabled })

  return (
    <FormItem className={className}>
      {label != null && <FormLabel>{label}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outlined"
              className={cn("h-11 w-full text-left font-normal")}
              disabled={field.disabled}
            >
              {field.value != null
                ? formatDate({
                    date: field.value,
                    // locale: profile.locale,
                    locale: "fr-FR",
                    // Not specifying a TZ because if it's different from user browser
                    // The selected date might be different than the one he clicked on
                  })
                : "Select a birthdate"}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode={mode}
            selected={field.value ?? undefined}
            onSelect={field.onChange}
          />
        </PopoverContent>
      </Popover>

      <FormMessage
        type={error?.message != null ? "error" : "default"}
        content={error?.message ?? helperText}
      />
    </FormItem>
  )
}
