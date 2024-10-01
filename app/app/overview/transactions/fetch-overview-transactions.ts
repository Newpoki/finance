"use server"

import { createClient } from "@/utils/supabase/server"

export const fetchOverviewTransactions = async () => {
  const supabase = createClient()

  const { data } = await supabase
    .from("transactions")
    .select("id,name,category,amount_cents,date,currency_code")
    .order("date", { ascending: false })
    .range(0, 4)

  if (data == null) {
    throw new Error(
      "An error occured while fetching transactions, should'nt be null",
    )
  }

  console.log({ data })

  return data
}
