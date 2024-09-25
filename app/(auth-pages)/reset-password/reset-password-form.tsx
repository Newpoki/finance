"use client"

import { FieldPath, useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import EyeSlash from "@/icons/eye-slash.svg"
import Eye from "@/icons/eye.svg"
import { useCallback, useState, useTransition } from "react"
import { resetPasswordAction } from "./reset-password-actions"
import {
  ResetPasswordFormValues,
  resetPasswordFormValuesSchema,
} from "./reset-password-schemas"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { ControlledInput } from "@/components/rhk/controlled-input"

export const ResetPasswordForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const router = useRouter()

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormValuesSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
    reValidateMode: "onChange",
  })

  const [isSubmitting, startTransition] = useTransition()

  const rootErrorMessage = form.formState.errors.root?.message

  const handleTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((current) => !current)
  }, [])

  const onSubmit = useCallback(
    (data: ResetPasswordFormValues) => {
      startTransition(async () => {
        const response = await resetPasswordAction(data)

        // Server will redirect anyway
        if (response.type === "success") {
          toast.success("Your password has been updated.")

          router.push("/sign-in")

          return
        }

        if (response.type === "generic") {
          form.setError("root", { message: response.message })
          return
        }

        response.fields.forEach((field) => {
          form.setError(field.path as FieldPath<ResetPasswordFormValues>, {
            message: field.message,
          })
        })
      })
    },
    [form, router],
  )

  return (
    <Form {...form}>
      {rootErrorMessage != null && (
        <Alert variant="destructive">
          <AlertTitle>An error occured while sign-in</AlertTitle>
          <AlertDescription>{rootErrorMessage}</AlertDescription>
        </Alert>
      )}

      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <ControlledInput
          name="password"
          control={form.control}
          label="Password"
          type={isPasswordVisible ? "text" : "password"}
          disabled={isSubmitting}
          required
          helperText="Password must be at least 8 characters"
          endAdornment={
            <Button
              variant="ghost"
              disabled={isSubmitting}
              className="-m-4 font-bold"
              type="button"
              onClick={handleTogglePasswordVisibility}
            >
              {isPasswordVisible ? <Eye /> : <EyeSlash />}
            </Button>
          }
        />

        <ControlledInput
          name="passwordConfirmation"
          control={form.control}
          label="Confirm your password"
          type={isPasswordVisible ? "text" : "password"}
          disabled={isSubmitting}
          required
        />

        <Button className="w-full" disabled={isSubmitting}>
          Reset
        </Button>
      </form>
    </Form>
  )
}
