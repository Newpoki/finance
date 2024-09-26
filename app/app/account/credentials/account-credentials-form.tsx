"use client"

import { useForm } from "react-hook-form"
import {
  AccountCredentialsFormValues,
  accountCredentialsFormValuesSchema,
} from "./account-credentials-types"
import { Profile } from "../profile/account-profile-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react"
import { Form } from "@/components/ui/form"
import { ControlledInput } from "@/components/rhk/controlled-input"
import { Button } from "@/components/ui/button"
import { SaveIcon } from "lucide-react"
import { ControlledPasswordInput } from "@/components/rhk/controlled-password-input"

type AccountCredentialsFormProps = {
  profile: Profile
}

export const AccountCredentialsForm = ({
  profile,
}: AccountCredentialsFormProps) => {
  const form = useForm<AccountCredentialsFormValues>({
    resolver: zodResolver(accountCredentialsFormValuesSchema),
    defaultValues: {
      email: profile.email ?? "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
    disabled: true,
  })

  // Form is disabled while waiting for how to do it properly
  const disabled = true

  const onSubmit = useCallback((formValues: AccountCredentialsFormValues) => {
    console.log({ formValues })
  }, [])

  return (
    <Form {...form}>
      <form
        className="flex flex-1 flex-col gap-4"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <section className="grid flex-1 gap-4">
          <ControlledInput
            name="email"
            control={form.control}
            label="Email"
            type="email"
            disabled={disabled}
            required
          />

          <ControlledPasswordInput
            name="newPassword"
            control={form.control}
            label="New password"
            disabled={disabled}
            placeholder="**************"
          />

          <ControlledPasswordInput
            name="newPasswordConfirmation"
            control={form.control}
            label="Confirm New Password"
            disabled={disabled}
            placeholder="**************"
          />
        </section>

        <Button className="w-full gap-2 md:w-fit" disabled={disabled}>
          <SaveIcon />
          <span>Save</span>
        </Button>
      </form>
    </Form>
  )
}
