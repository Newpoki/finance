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
import {
  Locale,
  Timezone,
} from "@/app/app/account/profile/account-profile-types"
import { fr, enUS } from "date-fns/locale"
import { useMemo } from "react"

type ControlledDayPickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<CalendarProps, "locale" | "timeZone"> & {
    label?: string
    helperText?: string
    locale: Locale
    timezone: Timezone
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
  locale,
  timezone,
}: ControlledDayPickerProps<TFieldValues, TName>) {
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

  const dateFnsLocale = useMemo(() => {
    switch (locale) {
      case "fr-FR":
        return fr

      default:
      case "en-US":
        return enUS
    }
  }, [locale])

  return (
    <FormItem className={className}>
      {label != null && <FormLabel>{label}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outlined"
              className={cn("h-11 w-full text-left font-normal")}
              disabled={disabled}
            >
              {field.value != null
                ? formatDate({
                    date: field.value,
                    locale: locale,
                    timeZone: timezone,
                  })
                : "Select a day"}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            selected={field.value ?? undefined}
            onSelect={field.onChange}
            mode="single"
            timeZone={timezone}
            locale={dateFnsLocale}
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
