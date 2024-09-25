"use client"

import { FieldPath, useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import EyeSlash from "@/icons/eye-slash.svg"
import Eye from "@/icons/eye.svg"
import { useCallback, useState, useTransition } from "react"
import { signUpAction } from "./sign-up-actions"
import { SignupFormValues, signupFormValuesSchema } from "./sign-up-schemas"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ControlledInput } from "@/components/rhk/controlled-input"

export const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormValuesSchema),
    defaultValues: {
      email: "",
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
    (data: SignupFormValues) => {
      startTransition(async () => {
        const response = await signUpAction(data)

        if (response.type === "success") {
          toast.success(
            "Thanks for signin up! Please check your email for a verification link.",
          )

          form.reset()

          return
        }

        if (response.type === "generic") {
          form.setError("root", { message: response.message })
          return
        }

        response.fields.forEach((field) => {
          form.setError(field.path as FieldPath<SignupFormValues>, {
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
          <AlertTitle>An error occured while signin up</AlertTitle>
          <AlertDescription>{rootErrorMessage}</AlertDescription>
        </Alert>
      )}

      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <ControlledInput
          name="email"
          control={form.control}
          label="Email"
          type="email"
          disabled={isSubmitting}
          placeholder="you@example.com"
          required
        />

        <ControlledInput
          name="password"
          control={form.control}
          label="Password"
          type="password"
          disabled={isSubmitting}
          placeholder="you@example.com"
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
          label="Confirm Password"
          type="password"
          disabled={isSubmitting}
          required
        />

        <Button className="w-full" disabled={isSubmitting}>
          Signup
        </Button>
      </form>
    </Form>
  )
}
