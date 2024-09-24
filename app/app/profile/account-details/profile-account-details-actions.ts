"use server"

import { ServerResponse } from "@/app/server-response"
import { profileAccountDetailsFormValuesSchema } from "./profile-account-details-types"
import { transformZodErrors } from "@/utils/transform-zod-errors"
import { createClient } from "@/utils/supabase/server"
import { fetchCurrentUserProfile } from "../fetch-current-user-profile"

export const updateProfileAccountDetails = async (
  data: unknown,
): Promise<ServerResponse> => {
  const parsed = profileAccountDetailsFormValuesSchema.safeParse(data)

  if (!parsed.success) {
    return {
      type: "validation",
      fields: transformZodErrors(parsed.error),
    }
  }

  const supabase = createClient()

  const currentUserProfile = await fetchCurrentUserProfile()

  const payload = {
    birthdate: parsed.data.birthdate?.toISOString(),
    first_name: parsed.data.firstName,
    last_name: parsed.data.lastName,
    email: parsed.data.email,
  }

  //   TODO: Check why the date is one day in past when saving birthdate

  const { error } = await supabase
    .from("profile")
    .update(payload)
    .eq("id", currentUserProfile.id)

  if (error) {
    return { type: "generic", message: error.message }
  }

  return { type: "success", data: null }
}
