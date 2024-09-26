"use server"

import { ServerResponse } from "@/app/server-response"
import { signupFormValuesSchema } from "./sign-up-schemas"
import { transformZodErrors } from "@/utils/transform-zod-errors"
import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"
import {
  CurrencyCode,
  Locale,
  Timezone,
} from "@/app/app/account/profile/account-profile-types"

export const signUpAction = async (data: unknown): Promise<ServerResponse> => {
  const parsed = signupFormValuesSchema.safeParse(data)

  if (!parsed.success) {
    return {
      type: "validation",
      fields: transformZodErrors(parsed.error),
    }
  }

  const { email, password } = parsed.data

  const supabase = createClient()

  const origin = headers().get("origin")

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        timezone: "Europe/Paris" satisfies Timezone,
        locale: "en-US" satisfies Locale,
        currency_code: "EUR" satisfies CurrencyCode,
      },
    },
  })

  if (error) {
    return { type: "generic", message: error.message }
  }

  return { type: "success", data: null }
}
