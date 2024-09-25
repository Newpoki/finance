"use client"

import { Form } from "@/components/ui/form"
import { useCallback, useTransition } from "react"
import { FieldPath, useForm } from "react-hook-form"
import {
  AccountProfileFormValues,
  accountProfileFormValuesSchema,
  Profile,
} from "./account-profile-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { updateAccountProfile } from "./account-profile-actions"
import { toast } from "sonner"
import {
  ACCOUNT_PROFILE_CURRENCIES_OPTIONS,
  ACCOUNT_PROFILE_LANGUAGES_OPTIONS,
  ACCOUNT_PROFILE_TIMEZONES_OPTIONS,
} from "./account-profile-constants"
import { ControlledInput } from "@/components/rhk/controlled-input"
import { ControlledDayPicker } from "@/components/rhk/controlled-day-picker"
import { ControlledSelect } from "@/components/rhk/controlled-select"

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
        <ControlledInput
          name="email"
          control={form.control}
          label="Email"
          type="email"
          disabled={isSubmitting}
          required
        />

        <ControlledInput
          name="firstName"
          control={form.control}
          label="First Name"
          placeholder="John"
          disabled={isSubmitting}
          required
        />

        <ControlledInput
          name="lastName"
          control={form.control}
          label="Last Name"
          placeholder="doe"
          disabled={isSubmitting}
          required
        />

        <ControlledDayPicker
          name="birthdate"
          control={form.control}
          label="Birthdate"
          disabled={isSubmitting}
          mode="single"
        />

        <ControlledSelect
          control={form.control}
          disabled={isSubmitting}
          name="locale"
          label="Language"
          options={ACCOUNT_PROFILE_LANGUAGES_OPTIONS}
        />

        <ControlledSelect
          control={form.control}
          disabled={isSubmitting}
          name="currencyCode"
          label="Currency"
          options={ACCOUNT_PROFILE_CURRENCIES_OPTIONS}
        />

        <ControlledSelect
          control={form.control}
          disabled={isSubmitting}
          name="timezone"
          label="Timezone"
          options={ACCOUNT_PROFILE_TIMEZONES_OPTIONS}
        />

        <Button className="w-full" disabled={isSubmitting}>
          Save
        </Button>
      </form>
    </Form>
  )
}
