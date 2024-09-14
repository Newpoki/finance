"use server"

import { createClient } from "@/utils/supabase/server"
import {
  TRANSACTIONS_CATEGORY_KEYS,
  TRANSACTIONS_SORT_DIRECTIONS,
} from "../transactions-constants"
import { parseTransactionsSearchParams } from "../parse-transactions-search-params"

type FetchTransactionsParams = {
  searchParams: { column?: string; direction?: string }
}

export const fetchTransactions = async ({
  searchParams,
}: FetchTransactionsParams) => {
  const supabase = createClient()

  const { column, direction, category, search } =
    parseTransactionsSearchParams(searchParams)

  let query = supabase
    .from("transactions")
    .select("id,created_at,amount_cents,category,name,date")

  // As there is no ALL category in DB, we only filter by category
  // if the category is something else
  if (category !== TRANSACTIONS_CATEGORY_KEYS.ALL) {
    query = query.eq("category", category)
  }

  if (search != null && search !== "") {
    query = query.ilike("name", `%${search}%`)
  }

  const transactions = await query.order(column, {
    ascending: direction === TRANSACTIONS_SORT_DIRECTIONS.ASC,
  })

  return transactions.data
}
