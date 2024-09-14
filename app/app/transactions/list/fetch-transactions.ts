"use server"

import { createClient } from "@/utils/supabase/server"
import { TRANSACTIONS_SORT_DIRECTIONS } from "../transactions-constants"
import { parseTransactionsSearchParams } from "../parse-transactions-search-params"

type FetchTransactionsParams = {
  searchParams: { column?: string; direction?: string }
}

export const fetchTransactions = async ({
  searchParams,
}: FetchTransactionsParams) => {
  const supabase = createClient()

  const { column, direction } = parseTransactionsSearchParams(searchParams)

  const transactions = await supabase
    .from("transactions")
    .select("id,created_at,amount_cents,category,name,date")
    .order(column, {
      ascending: direction === TRANSACTIONS_SORT_DIRECTIONS.ASC,
    })

  return transactions.data
}
