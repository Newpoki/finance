"use server"

import { createClient } from "@/utils/supabase/server"
import { fetchCurrentUserProfile } from "../profile/fetch-current-user-profile"

export const fetchCurrentUserTransactionCategories = async () => {
  const supabase = createClient()

  const profile = await fetchCurrentUserProfile()

  const { data } = await supabase
    .from("transaction_category")
    .select("*")
    .order("name", { ascending: false })
    .filter("user_id", "eq", profile.id)

  if (data == null) {
    throw new Error(
      "An error occured while fetching transactions categories, should'nt be null",
    )
  }

  return data
}
