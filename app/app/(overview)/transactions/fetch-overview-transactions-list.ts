"use server"

import { createClient } from "@/utils/supabase/server"

export const fetchOverviewTransactionsList = async () => {
  const supabase = createClient()

  const { data } = await supabase
    .from("transactions")
    .select("id,name,category,amount_cents,date", { count: "exact" })
    .order("date", { ascending: false })
    .range(0, 4)

  return data
}
