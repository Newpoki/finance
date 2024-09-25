"use client"

import { FieldPath, useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useCallback, useTransition } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ForgotPasswordFormValues,
  forgotPasswordFormValuesSchema,
} from "./forgot-password-schemas"
import { forgotPasswordAction } from "./forgot-password-actions"
import { toast } from "sonner"
import { ControlledInput } from "@/components/rhk/controlled-input"

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormValuesSchema),
    defaultValues: {
      email: "",
    },
    reValidateMode: "onChange",
  })

  const [isSubmitting, startTransition] = useTransition()

  const rootErrorMessage = form.formState.errors.root?.message

  const onSubmit = useCallback(
    (data: ForgotPasswordFormValues) => {
      startTransition(async () => {
        const response = await forgotPasswordAction(data)

        // Server will redirect anyway
        if (response.type === "success") {
          toast.success("Check your email for a link to reset your password.")
          return
        }

        if (response.type === "generic") {
          form.setError("root", { message: response.message })
          return
        }

        response.fields.forEach((field) => {
          form.setError(field.path as FieldPath<ForgotPasswordFormValues>, {
            message: field.message,
          })
        })
      })
    },
    [form],
  )

  return (
    <Form {...form}>
      {rootErrorMessage != null && (
        <Alert variant="destructive">
          <AlertTitle>
            An error occured while trying to reset password
          </AlertTitle>
          <AlertDescription>{rootErrorMessage}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <ControlledInput
          name="email"
          control={form.control}
          label="Email"
          type="email"
          placeholder="you@example.com"
          disabled={isSubmitting}
        />

        <Button className="w-full" disabled={isSubmitting}>
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
