"use client"

import { FieldPath, useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormMessage } from "@/components/form-message"
import { Button } from "@/components/ui/button"
import EyeSlash from "@/icons/eye-slash.svg"
import Eye from "@/icons/eye.svg"
import { useCallback, useState, useTransition } from "react"
import { signInAction } from "./sign-in-actions"
import { SigninFormValues, signinFormValuesSchema } from "./sign-in-schemas"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"

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
    async (data: SigninFormValues) => {
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

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FormField
          control={form.control}
          disabled={isSubmitting}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="you@example.com" required />
              </FormControl>
              {fieldState.error?.message && (
                <FormMessage message={{ error: fieldState.error.message }} />
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <FormItem className="mb-8">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  endAdornment={
                    <Button
                      variant="ghost"
                      disabled={isSubmitting}
                      className="-m-4"
                      type="button"
                      onClick={handleTogglePasswordVisibility}
                    >
                      {isPasswordVisible ? <Eye /> : <EyeSlash />}
                    </Button>
                  }
                />
              </FormControl>

              <FormMessage
                message={
                  fieldState.error?.message
                    ? { error: fieldState.error.message }
                    : { message: "Password must be at least 8 characters" }
                }
              />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isSubmitting}>
          Login
        </Button>
      </form>
    </Form>
  )
}
