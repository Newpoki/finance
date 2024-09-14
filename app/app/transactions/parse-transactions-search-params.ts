import { z } from "zod"
import {
  TRANSACTIONS_CATEGORY_KEYS,
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
  category: [
    TRANSACTIONS_CATEGORY_KEYS.ALL,
    TRANSACTIONS_CATEGORY_KEYS.BILLS,
    TRANSACTIONS_CATEGORY_KEYS.DINING_OUT,
    TRANSACTIONS_CATEGORY_KEYS.ENTERTAINMENT,
    TRANSACTIONS_CATEGORY_KEYS.GENERAL,
    TRANSACTIONS_CATEGORY_KEYS.GROCERIES,
    TRANSACTIONS_CATEGORY_KEYS.LIFESTYLE,
    TRANSACTIONS_CATEGORY_KEYS.PERSONAL_CARE,
    TRANSACTIONS_CATEGORY_KEYS.TRANSPORTATION,
  ],
} as const

const transactionsSearchParamsSchema = z.object({
  column: z.enum(allowedValues.columns).catch(TRANSACTIONS_SORT_KEYS.DATE),
  direction: z
    .enum(allowedValues.direction)
    .catch(TRANSACTIONS_SORT_DIRECTIONS.DESC),
  category: z
    .enum(allowedValues.category)
    .catch(TRANSACTIONS_CATEGORY_KEYS.ALL),
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
