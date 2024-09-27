"use server"

import { ServerResponse } from "@/app/server-response"
import { createClient } from "@/utils/supabase/server"
import { fetchCurrentUserProfile } from "./fetch-current-user-profile"
import { transformZodErrors } from "@/utils/transform-zod-errors"
import { getAccountProfileDeleteFormValuesSchema } from "./account-profile-types"
import { redirect } from "next/navigation"

export const deleteAccount = async (
  data: unknown,
): Promise<ServerResponse | undefined> => {
  const supabase = createClient()

  const currentUserProfile = await fetchCurrentUserProfile()

  const parsed = getAccountProfileDeleteFormValuesSchema(
    currentUserProfile.email,
  ).safeParse(data)

  if (!parsed.success) {
    return {
      type: "validation",
      fields: transformZodErrors(parsed.error),
    }
  }

  // RPC function has been found here -> https://github.com/orgs/supabase/discussions/250#discussioncomment-5361165
  const { error } = await supabase.rpc("delete_user")

  if (error) {
    return { type: "generic", message: error.message }
  }

  redirect("/sign-in")
}
