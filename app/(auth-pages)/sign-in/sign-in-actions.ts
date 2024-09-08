"use server"

import { createClient } from "@/utils/supabase/server"
import { signinFormValuesSchema } from "./sign-in-schemas"
import { redirect } from "next/navigation"
import { ServerResponse } from "../../server-response"
import { transformZodErrors } from "@/utils/transform-zod-errors"

export const signInAction = async (data: unknown): Promise<ServerResponse> => {
  const parsed = signinFormValuesSchema.safeParse(data)

  if (!parsed.success) {
    return {
      type: "validation",
      fields: transformZodErrors(parsed.error),
    }
  }

  const { email, password } = parsed.data

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { type: "generic", message: error.message }
  }

  return redirect("/protected")
}
