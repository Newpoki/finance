"use server"

import { createClient } from "@/utils/supabase/server"
import { forgotPasswordFormValuesSchema } from "./forgot-password-schemas"
import { ServerResponse } from "../../server-response"
import { transformZodErrors } from "@/utils/transform-zod-errors"

export const forgotPasswordAction = async (
  data: unknown,
): Promise<ServerResponse> => {
  const parsed = forgotPasswordFormValuesSchema.safeParse(data)

  if (!parsed.success) {
    return {
      type: "validation",
      fields: transformZodErrors(parsed.error),
    }
  }

  const { email } = parsed.data

  const supabase = createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  })

  if (error) {
    return { type: "generic", message: error.message }
  }

  return {
    type: "success",
    data: null,
  }
}
