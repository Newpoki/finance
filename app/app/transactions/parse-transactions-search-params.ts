import { z } from "zod"
import {
  TRANSACTIONS_FILTERS_CATEGORIES_ALL_OPTION,
  TRANSACTIONS_FILTERS_SORT_DIRECTIONS,
  TRANSACTIONS_FILTERS_SORT_KEYS,
} from "./transactions-constants"
import { addDays, format, lastDayOfMonth, set } from "date-fns"
import { Timezone } from "../account/profile/account-profile-types"
import { TZDate } from "@date-fns/tz"

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

const getTransactionsSearchParamsSchema = (date: TZDate) => {
  const firstDayOfMonthDate = set(date, {
    date: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })

  return z.object({
    column: z
      .enum(allowedValues.columns)
      .catch(TRANSACTIONS_FILTERS_SORT_KEYS.DATE),
    direction: z
      .enum(allowedValues.direction)
      .catch(TRANSACTIONS_FILTERS_SORT_DIRECTIONS.DESC),
    category: z
      .string()
      .catch(TRANSACTIONS_FILTERS_CATEGORIES_ALL_OPTION.value),
    search: z.string().optional(),
    page: z.coerce.number().catch(0),
    start_at: z
      .string()
      .date()
      .catch(() => {
        return format(firstDayOfMonthDate, "yyyy-MM-dd")
      }),
    end_at: z
      .string()
      .date()
      .catch(() => {
        // PostgreSQL query will take transaction interval exclude end date -> [startDate, endDate[
        const lastDayOfMonthDate = addDays(
          lastDayOfMonth(firstDayOfMonthDate),
          1,
        )

        return format(lastDayOfMonthDate, "yyyy-MM-dd")
      }),
  })
}

export const parseTransactionsSearchParams = (
  searchParams: unknown,
  timezone: Timezone,
) => {
  const currentDateInUserTZ = new TZDate(new Date(), timezone)

  const result =
    getTransactionsSearchParamsSchema(currentDateInUserTZ).parse(searchParams)

  return result
}

export type ParsedTransactionsSearchParams = ReturnType<
  typeof parseTransactionsSearchParams
>
