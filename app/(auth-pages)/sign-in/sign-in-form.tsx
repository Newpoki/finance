"use client"

import { FieldPath, useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import EyeSlash from "@/icons/eye-slash.svg"
import Eye from "@/icons/eye.svg"
import { useCallback, useState, useTransition } from "react"
import { signInAction } from "./sign-in-actions"
import { SigninFormValues, signinFormValuesSchema } from "./sign-in-schemas"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { ControlledInput } from "@/components/rhk/controlled-input"

export const SigninForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinFormValuesSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  })

  const [isSubmitting, startTransition] = useTransition()

  const rootErrorMessage = form.formState.errors.root?.message

  const handleTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((current) => !current)
  }, [])

  const onSubmit = useCallback(
    (data: SigninFormValues) => {
      startTransition(async () => {
        const response = await signInAction(data)

        // Server will redirect anyway
        if (response.type === "success") {
          return
        }

        if (response.type === "generic") {
          form.setError("root", { message: response.message })
          return
        }

        response.fields.forEach((field) => {
          form.setError(field.path as FieldPath<SigninFormValues>, {
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
          type={isPasswordVisible ? "text" : "password"}
          disabled={isSubmitting}
          placeholder="you@example.com"
          required
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

        <Button className="w-full" disabled={isSubmitting}>
          Login
        </Button>
      </form>
    </Form>
  )
}
