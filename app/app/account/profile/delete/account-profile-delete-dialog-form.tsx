"use client"

import { FieldPath, useForm } from "react-hook-form"
import {
  AccountProfileDeleteFormValues,
  getAccountProfileDeleteFormValuesSchema,
  Profile,
} from "../account-profile-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useTransition } from "react"
import { deleteAccount } from "../delete-account"
import { Form } from "@/components/ui/form"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ControlledInput } from "@/components/rhk/controlled-input"

type AccountProfileDeleteDialogFormProps = {
  profile: Profile
  closeDialog: () => void
}

export const AccountProfileDeleteDialogForm = ({
  profile,
  closeDialog,
}: AccountProfileDeleteDialogFormProps) => {
  const form = useForm<AccountProfileDeleteFormValues>({
    resolver: zodResolver(
      getAccountProfileDeleteFormValuesSchema(profile.email),
    ),
    defaultValues: {
      confirmEmail: "",
    },
  })

  const [isSubmitting, startTransition] = useTransition()

  const onSubmit = useCallback(
    (formValues: AccountProfileDeleteFormValues) => {
      startTransition(async () => {
        const response = await deleteAccount(formValues)

        if (response == null) {
          toast.success(
            "Your account and all the data have been deleted successfully",
          )

          return
        }

        if (response.type === "generic") {
          form.setError("root", { message: response.message })
          return
        }

        if (response.type === "validation") {
          response.fields.forEach((field) => {
            form.setError(
              field.path as FieldPath<AccountProfileDeleteFormValues>,
              {
                message: field.message,
              },
            )
          })
        }
      })
    },
    [form],
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and associated data from our servers.
          </DialogDescription>
        </DialogHeader>

        <ControlledInput
          control={form.control}
          name="confirmEmail"
          type="email"
          placeholder={profile.email}
          required
          helperText="To confirm, please enter your current email"
        />

        <DialogFooter>
          {/* TODO: Add and use destructive variant */}
          <Button disabled={isSubmitting} type="button" onClick={closeDialog}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} variant="error">
            Continue
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
