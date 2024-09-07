"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { useCallback, useState } from "react"
import { signInAction } from "@/app/actions"

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
})

export const SigninForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((current) => !current)
  }, [])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      if (!form.formState.isValid) {
        event.preventDefault()
        await form.trigger()
        return
      }

      event.currentTarget?.requestSubmit()
    },
    [form],
  )

  console.log(form.formState.isSubmitting)

  return (
    <Form {...form}>
      <form action={signInAction} onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
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
          render={({ field, fieldState }) => (
            <FormItem className="mb-8">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={isPasswordVisible ? "text" : "password"}
                  endAdornment={
                    <Button
                      variant="ghost"
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

        <Button className="w-full">Login</Button>
      </form>
    </Form>
  )
}
