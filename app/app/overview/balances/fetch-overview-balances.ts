"use server"

import { createClient } from "@/utils/supabase/server"

export const fetchOverviewBalances = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user == null) {
    throw new Error("User should be logged")
  }

  const { data } = await supabase
    .rpc("aggregate_balance_and_monthly_incomes_expenses", {
      _user_id: user.id,
    })
    .single()

  if (data == null) {
    throw new Error("Can't fetch user balance")
  }

  return data
}
