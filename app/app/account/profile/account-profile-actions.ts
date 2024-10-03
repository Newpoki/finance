"use server"

import { ServerResponse } from "@/app/server-response"
import { accountProfileFormValuesSchema } from "./account-profile-types"
import { transformZodErrors } from "@/utils/transform-zod-errors"
import { createClient } from "@/utils/supabase/server"
import { fetchCurrentUserProfile } from "./fetch-current-user-profile"
import { revalidatePath } from "next/cache"

export const updateAccountProfileAction = async (
  data: unknown,
): Promise<ServerResponse> => {
  const parsed = accountProfileFormValuesSchema.safeParse(data)

  if (!parsed.success) {
    return {
      type: "validation",
      fields: transformZodErrors(parsed.error),
    }
  }

  const supabase = createClient()

  const currentUserProfile = await fetchCurrentUserProfile()

  const payload = {
    first_name: parsed.data.firstName,
    last_name: parsed.data.lastName,
    locale: parsed.data.locale,
    currency_code: parsed.data.currencyCode,
    timezone: parsed.data.timezone,
    birthdate: parsed.data.birthdate,
  }

  const { error } = await supabase
    .from("profile")
    .update(payload)
    .eq("id", currentUserProfile.id)

  if (error) {
    return { type: "generic", message: error.message }
  }

  revalidatePath("/app")
  return { type: "success", data: null }
}
