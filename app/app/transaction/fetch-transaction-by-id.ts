"use server"

import { createClient } from "@/utils/supabase/server"

export const fetchTransactionById = async (transactionId: string) => {
  const supabase = createClient()

  const { data } = await supabase
    .from("transactions")
    .select("*")
    .filter("id", "eq", transactionId)
    .single()

  if (data == null) {
    throw new Error("Transaction not found")
  }

  return data
}
