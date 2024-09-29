"use server"

import { createClient } from "@/utils/supabase/server"
import {
  TRANSACTIONS_FILTERS_CATEGORIES_ALL_OPTION,
  TRANSACTIONS_FILTERS_SORT_DIRECTIONS,
} from "../transactions-constants"
import { ParsedTransactionsSearchParams } from "../parse-transactions-search-params"
import { getPaginationRange } from "@/utils/pagination/get-pagination-range"
import { getTotalPaginationPages } from "@/utils/pagination/get-total-pagination-pages"
import { fetchCurrentUserProfile } from "../../account/profile/fetch-current-user-profile"

type FetchTransactionsParams = {
  searchParams: ParsedTransactionsSearchParams
}

const ITEM_PER_PAGE = 10 as const

export const fetchTransactions = async ({
  searchParams,
}: FetchTransactionsParams) => {
  const supabase = createClient()

  const { column, direction, category, search, page } = searchParams

  const currentUserProfile = await fetchCurrentUserProfile()

  const { count: totalCount } = await supabase
    .from("transactions")
    .select("*", { count: "exact" })
    .filter("user_id", "eq", currentUserProfile.id)

  if (totalCount == null) {
    throw new Error(
      "An error occured while trying to get the total transactions count",
    )
  }

  let query = supabase
    .from("transactions")
    .select("id,amount_cents,category,name,date,currency_code", {
      count: "exact",
    })
    .filter("user_id", "eq", currentUserProfile.id)

  // As there is no ALL category in DB, we only filter by category
  // if the category is something else
  if (category !== TRANSACTIONS_FILTERS_CATEGORIES_ALL_OPTION.value) {
    query = query.eq("category", category)
  }

  if (search != null && search !== "") {
    query = query.ilike("name", `%${search}%`)
  }

  // Fetching a first time to get the count of the filtered elements
  // To get the number of transactions that matches the filters
  // ⚠️ there might be a better way for this, but I didn't find out anything relevant
  const { count } = await query

  if (count == null) {
    throw new Error(
      "An error occured while trying to get the filtered transactions count",
    )
  }

  const { rangeFrom, rangeTo } = await getPaginationRange({
    count,
    pageNumber: page,
    itemPerPage: ITEM_PER_PAGE,
  })

  const transactions = await query
    .order(column, {
      ascending: direction === TRANSACTIONS_FILTERS_SORT_DIRECTIONS.ASC,
    })
    .range(rangeFrom, rangeTo)

  const totalPages = await getTotalPaginationPages({
    count,
    itemPerPage: ITEM_PER_PAGE,
  })

  if (transactions.data == null) {
    throw new Error("An error occured while fetching transactions")
  }

  return { transactions: transactions.data, totalPages, totalCount }
}
