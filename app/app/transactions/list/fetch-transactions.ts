"use server"

import { createClient } from "@/utils/supabase/server"
import {
  TRANSACTIONS_CATEGORY_KEYS,
  TRANSACTIONS_SORT_DIRECTIONS,
} from "../transactions-constants"
import { ParsedTransactionsSearchParams } from "../parse-transactions-search-params"
import { getPaginationRange } from "@/utils/pagination/get-pagination-range"
import { getTotalPaginationPages } from "@/utils/pagination/get-total-pagination-pages"

type FetchTransactionsParams = {
  searchParams: ParsedTransactionsSearchParams
}

const ITEM_PER_PAGE = 10 as const

export const fetchTransactions = async ({
  searchParams,
}: FetchTransactionsParams) => {
  const supabase = createClient()

  const { column, direction, category, search, page } = searchParams

  const { count } = await supabase
    .from("transactions")
    .select("*", { count: "exact" })

  if (count == null) {
    throw new Error("Requested rangeTo is greater than count")
  }

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

  const { rangeFrom, rangeTo } = await getPaginationRange({
    count,
    pageNumber: page,
    itemPerPage: ITEM_PER_PAGE,
  })

  const transactions = await query
    .order(column, {
      ascending: direction === TRANSACTIONS_SORT_DIRECTIONS.ASC,
    })
    .range(rangeFrom, rangeTo)

  const totalPages = await getTotalPaginationPages({
    count,
    itemPerPage: ITEM_PER_PAGE,
  })

  return { transactions: transactions.data, totalPages }
}
