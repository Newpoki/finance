import { z } from "zod"
import {
  TRANSACTIONS_FILTERS_CATEGORIES_ALL_OPTION,
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
} as const

const transactionsSearchParamsSchema = z.object({
  column: z
    .enum(allowedValues.columns)
    .catch(TRANSACTIONS_FILTERS_SORT_KEYS.DATE),
  direction: z
    .enum(allowedValues.direction)
    .catch(TRANSACTIONS_FILTERS_SORT_DIRECTIONS.DESC),
  category: z.string().catch(TRANSACTIONS_FILTERS_CATEGORIES_ALL_OPTION.value),
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
