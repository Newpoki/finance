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
import { signUpAction } from "./sign-up-actions"
import { SignupFormValues, signupFormValuesSchema } from "./sign-up-schemas"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

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
    async (data: SignupFormValues) => {
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
        <FormField
          control={form.control}
          disabled={isSubmitting}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
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
            <FormItem>
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

        <FormField
          control={form.control}
          name="passwordConfirmation"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <FormItem className="mb-4">
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input {...field} type="password" required />
              </FormControl>

              {fieldState.error?.message && (
                <FormMessage message={{ error: fieldState.error.message }} />
              )}
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isSubmitting}>
          Signup
        </Button>
      </form>
    </Form>
  )
}
