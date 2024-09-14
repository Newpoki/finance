"use server"

import { createClient } from "@/utils/supabase/server"
import {
  TRANSACTIONS_SORT_DIRECTIONS,
  TRANSACTIONS_SORT_KEYS,
} from "../transactions-constants"
import { z } from "zod"

type FetchTransactionsParams = {
  searchParams: { column?: string; direction?: string }
}

const allowedValues = {
  columns: [
    TRANSACTIONS_SORT_KEYS.AMOUNT,
    TRANSACTIONS_SORT_KEYS.CATEGORY,
    TRANSACTIONS_SORT_KEYS.CREATED_AT,
  ],
  direction: [
    TRANSACTIONS_SORT_DIRECTIONS.ASC,
    TRANSACTIONS_SORT_DIRECTIONS.DESC,
  ],
} as const

const transactionsSearchParamsSchema = z.object({
  column: z.enum(allowedValues.columns).catch(TRANSACTIONS_SORT_KEYS.AMOUNT),
  direction: z
    .enum(allowedValues.direction)
    .catch(TRANSACTIONS_SORT_DIRECTIONS.DESC),
})

export const fetchTransactions = async ({
  searchParams,
}: FetchTransactionsParams) => {
  const { column, direction } =
    transactionsSearchParamsSchema.parse(searchParams)

  const supabase = createClient()

  const transactions = await supabase
    .from("transactions")
    .select("id,created_at,amount_cents,category,name,date")
    .order(column, {
      ascending: direction === TRANSACTIONS_SORT_DIRECTIONS.ASC,
    })

  return transactions.data
}
