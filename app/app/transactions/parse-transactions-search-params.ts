import { z } from "zod"
import {
  TRANSACTIONS_FILTERS_CATEGORIES_KEYS,
  TRANSACTIONS_FILTERS_SORT_DIRECTIONS,
  TRANSACTIONS_FILTERS_SORT_KEYS,
} from "./transactions-constants"

const allowedValues = {
  columns: [
    TRANSACTIONS_FILTERS_SORT_KEYS.AMOUNT,
    TRANSACTIONS_FILTERS_SORT_KEYS.NAME,
    TRANSACTIONS_FILTERS_SORT_KEYS.DATE,
  ],
  direction: [
    TRANSACTIONS_FILTERS_SORT_DIRECTIONS.ASC,
    TRANSACTIONS_FILTERS_SORT_DIRECTIONS.DESC,
  ],
  category: [
    TRANSACTIONS_FILTERS_CATEGORIES_KEYS.ALL,
    TRANSACTIONS_FILTERS_CATEGORIES_KEYS.BILLS,
    TRANSACTIONS_FILTERS_CATEGORIES_KEYS.DINING_OUT,
    TRANSACTIONS_FILTERS_CATEGORIES_KEYS.ENTERTAINMENT,
    TRANSACTIONS_FILTERS_CATEGORIES_KEYS.GENERAL,
    TRANSACTIONS_FILTERS_CATEGORIES_KEYS.GROCERIES,
    TRANSACTIONS_FILTERS_CATEGORIES_KEYS.LIFESTYLE,
    TRANSACTIONS_FILTERS_CATEGORIES_KEYS.PERSONAL_CARE,
    TRANSACTIONS_FILTERS_CATEGORIES_KEYS.TRANSPORTATION,
  ],
} as const

const transactionsSearchParamsSchema = z.object({
  column: z
    .enum(allowedValues.columns)
    .catch(TRANSACTIONS_FILTERS_SORT_KEYS.DATE),
  direction: z
    .enum(allowedValues.direction)
    .catch(TRANSACTIONS_FILTERS_SORT_DIRECTIONS.DESC),
  category: z
    .enum(allowedValues.category)
    .catch(TRANSACTIONS_FILTERS_CATEGORIES_KEYS.ALL),
  search: z.string().optional(),
  page: z.coerce.number().catch(0),
})

export const parseTransactionsSearchParams = (searchParams: unknown) => {
  const result = transactionsSearchParamsSchema.parse(searchParams)

  return result
}

export type ParsedTransactionsSearchParams = ReturnType<
  typeof parseTransactionsSearchParams
>
