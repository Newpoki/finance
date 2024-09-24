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
import { useCallback, useTransition } from "react"
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
          disabled={isSubmitting}
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
                            timeZone: profile.timezone,
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

        {/* TODO: add Language, currency fields and timezone field */}

        <Button className="w-full" disabled={isSubmitting}>
          Save
        </Button>
      </form>
    </Form>
  )
}
