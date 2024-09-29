"use server"

import { createClient } from "@/utils/supabase/server"

export const fetchTransactionCategoryById = async (
  transactionCategoryId: string,
) => {
  const supabase = createClient()

  const { data } = await supabase
    .from("transaction_category")
    .select("*")
    .filter("id", "eq", transactionCategoryId)
    .single()

  if (data == null) {
    throw new Error("Transaction category not found")
  }

  return data
}
