"use server"

import { ServerResponse } from "@/app/server-response"
import { resetPasswordFormValuesSchema } from "./reset-password-schemas"
import { transformZodErrors } from "@/utils/transform-zod-errors"
import { createClient } from "@/utils/supabase/server"

export const resetPasswordAction = async (
  data: unknown,
): Promise<ServerResponse> => {
  const parsed = resetPasswordFormValuesSchema.safeParse(data)

  if (!parsed.success) {
    return {
      type: "validation",
      fields: transformZodErrors(parsed.error),
    }
  }

  const { password } = parsed.data

  const supabase = createClient()

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { type: "generic", message: error.message }
  }

  return { type: "success", data: null }
}
