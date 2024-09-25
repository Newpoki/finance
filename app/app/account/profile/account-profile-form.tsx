"use client"

import { FormMessage } from "@/components/form-message"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Fragment, useCallback, useTransition } from "react"
import { FieldPath, useForm } from "react-hook-form"
import {
  AccountProfileFormValues,
  accountProfileFormValuesSchema,
  Profile,
} from "./account-profile-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { formatDate } from "@/date/format-date"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { updateAccountProfile } from "./account-profile-actions"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ACCOUNT_PROFILE_CURRENCIES_OPTIONS,
  ACCOUNT_PROFILE_LANGUAGES_OPTIONS,
  ACCOUNT_PROFILE_TIMEZONES_OPTIONS,
} from "./account-profile-constants"

type AccountProfileFormProps = {
  profile: Profile
}

export const AccountProfileForm = ({ profile }: AccountProfileFormProps) => {
  const form = useForm<AccountProfileFormValues>({
    resolver: zodResolver(accountProfileFormValuesSchema),
    defaultValues: {
      email: profile.email ?? "",
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      birthdate: profile.birthdate != null ? new Date(profile.birthdate) : null,
      locale: profile.locale,
      currencyCode: profile.currency_code,
      timezone: profile.timezone,
    },
  })

  const [isSubmitting, startTransition] = useTransition()

  const onSubmit = useCallback(
    (formValues: AccountProfileFormValues) => {
      startTransition(async () => {
        const response = await updateAccountProfile(formValues)

        if (response.type === "success") {
          toast.success("Your account details have been updated")

          return
        }

        if (response.type === "generic") {
          form.setError("root", { message: response.message })
          return
        }

        response.fields.forEach((field) => {
          form.setError(field.path as FieldPath<AccountProfileFormValues>, {
            message: field.message,
          })
        })
      })
    },
    [form],
  )

  return (
    /* TODO: Layout for tablet and desktop */
    <Form {...form}>
      <form
        className="flex flex-1 flex-col gap-4"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              {fieldState.error?.message && (
                <FormMessage message={{ error: fieldState.error.message }} />
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={isSubmitting}
          name="firstName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John" required />
              </FormControl>
              {fieldState.error?.message && (
                <FormMessage message={{ error: fieldState.error.message }} />
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={isSubmitting}
          name="lastName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="doe" required />
              </FormControl>
              {fieldState.error?.message && (
                <FormMessage message={{ error: fieldState.error.message }} />
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthdate"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="w-fit">Birthdate</FormLabel>
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
                            locale: profile.locale,
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
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={isSubmitting}
          name="locale"
          render={({ field, fieldState }) => {
            const selectedOption = ACCOUNT_PROFILE_LANGUAGES_OPTIONS.find(
              (option) => option.value === field.value,
            )

            if (selectedOption == null) {
              throw new Error("Selected locale option not found")
            }

            return (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>{selectedOption.label}</SelectValue>
                    </SelectTrigger>

                    <SelectContent sideOffset={8}>
                      {ACCOUNT_PROFILE_LANGUAGES_OPTIONS.map((option) => (
                        <Fragment key={option.value}>
                          <SelectItem value={option.value}>
                            {option.label}
                          </SelectItem>
                          <SelectSeparator className="last:hidden" />
                        </Fragment>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {fieldState.error?.message && (
                  <FormMessage message={{ error: fieldState.error.message }} />
                )}
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          disabled={isSubmitting}
          name="currencyCode"
          render={({ field, fieldState }) => {
            const selectedOption = ACCOUNT_PROFILE_CURRENCIES_OPTIONS.find(
              (option) => option.value === field.value,
            )

            if (selectedOption == null) {
              throw new Error("Selected currency option not found")
            }

            return (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>{selectedOption.label}</SelectValue>
                    </SelectTrigger>

                    <SelectContent sideOffset={8}>
                      {ACCOUNT_PROFILE_CURRENCIES_OPTIONS.map((option) => (
                        <Fragment key={option.value}>
                          <SelectItem value={option.value}>
                            {option.label}
                          </SelectItem>
                          <SelectSeparator className="last:hidden" />
                        </Fragment>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {fieldState.error?.message && (
                  <FormMessage message={{ error: fieldState.error.message }} />
                )}
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          disabled={isSubmitting}
          name="timezone"
          render={({ field, fieldState }) => {
            const selectedOption = ACCOUNT_PROFILE_TIMEZONES_OPTIONS.find(
              (option) => option.value === field.value,
            )

            if (selectedOption == null) {
              throw new Error("Selected timezone option not found")
            }

            return (
              <FormItem>
                <FormLabel>Timezone</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>{selectedOption.label}</SelectValue>
                    </SelectTrigger>

                    <SelectContent sideOffset={8}>
                      {ACCOUNT_PROFILE_TIMEZONES_OPTIONS.map((option) => (
                        <Fragment key={option.value}>
                          <SelectItem value={option.value}>
                            {option.label}
                          </SelectItem>
                          <SelectSeparator className="last:hidden" />
                        </Fragment>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {fieldState.error?.message && (
                  <FormMessage message={{ error: fieldState.error.message }} />
                )}
              </FormItem>
            )
          }}
        />

        <Button className="w-full" disabled={isSubmitting}>
          Save
        </Button>
      </form>
    </Form>
  )
}
