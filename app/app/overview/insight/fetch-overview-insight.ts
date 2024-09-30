"use server"

import { createClient } from "@/utils/supabase/server"
import { fetchCurrentUserProfile } from "../../account/profile/fetch-current-user-profile"

export const fetchOverviewInsight = async () => {
  const supabase = createClient()

  const currentUserProfile = await fetchCurrentUserProfile()

  const toto = await supabase.rpc("sum_amounts_per_category", {
    _user_id: currentUserProfile.id,
    _category_ids: [
      "7a834638-b5c9-43fe-95f0-8be8dd00814f",
      "bf3a1eaf-eb5d-4902-a083-33d62bf74680",
    ],
    _start_date: "2024-09-27",
    _end_date: "2024-10-01",
  })

  return toto
}
