import { z } from "zod"
import {
  TRANSACTIONS_SORT_DIRECTIONS,
  TRANSACTIONS_SORT_KEYS,
} from "./transactions-constants"
import { TransactionsPageSearchParams } from "./transactions-types"

const allowedValues = {
  columns: [
    TRANSACTIONS_SORT_KEYS.AMOUNT,
    TRANSACTIONS_SORT_KEYS.NAME,
    TRANSACTIONS_SORT_KEYS.DATE,
  ],
  direction: [
    TRANSACTIONS_SORT_DIRECTIONS.ASC,
    TRANSACTIONS_SORT_DIRECTIONS.DESC,
  ],
} as const

const transactionsSearchParamsSchema = z.object({
  column: z.enum(allowedValues.columns).catch(TRANSACTIONS_SORT_KEYS.DATE),
  direction: z
    .enum(allowedValues.direction)
    .catch(TRANSACTIONS_SORT_DIRECTIONS.DESC),
})

export const parseTransactionsSearchParams = (
  searchParams: TransactionsPageSearchParams,
) => {
  const result = transactionsSearchParamsSchema.parse(searchParams)

  return result
}

export type ParsedTransactionsSearchParams = ReturnType<
  typeof parseTransactionsSearchParams
>
