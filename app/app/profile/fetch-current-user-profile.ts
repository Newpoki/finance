"use server"

import { checkUserLoggedOrRedirect } from "@/utils/check-user-logged-or-redirect"
import { createClient } from "@/utils/supabase/server"

export const fetchCurrentUserProfile = async () => {
  const user = await checkUserLoggedOrRedirect()

  const supabase = createClient()

  const { data } = await supabase
    .schema("public")
    .from("profile")
    .select("*")
    .filter("id", "eq", user.id)
    .single()

  if (data == null) {
    throw new Error("User profile not found")
  }

  return data
}
