import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_CATEGORIES_OPTIONS,
} from "../transaction/transaction-constants"
import { TransactionCategory } from "../transaction/transaction-types"

export const TRANSACTIONS_FILTERS_SORT_DIRECTIONS = {
  DESC: "DESC",
  ASC: "ASC",
} as const

export const TRANSACTIONS_FILTERS_SORT_KEYS = {
  AMOUNT: "amount_cents",
  NAME: "name",
  DATE: "date",
} as const

export const TRANSACTIONS_FILTERS_CATEGORIES_KEYS = {
  ALL: "all",
  ...TRANSACTION_CATEGORIES,
} as const

export const TRANSACTIONS_SORT_OPTIONS = [
  {
    label: "Latest",
    id: `${TRANSACTIONS_FILTERS_SORT_KEYS.DATE}-${TRANSACTIONS_FILTERS_SORT_DIRECTIONS.DESC}`,
    config: {
      column: TRANSACTIONS_FILTERS_SORT_KEYS.DATE,
      direction: TRANSACTIONS_FILTERS_SORT_DIRECTIONS.DESC,
    },
  },
  {
    label: "Oldest",
    id: `${TRANSACTIONS_FILTERS_SORT_KEYS.DATE}-${TRANSACTIONS_FILTERS_SORT_DIRECTIONS.ASC}`,
    config: {
      column: TRANSACTIONS_FILTERS_SORT_KEYS.DATE,
      direction: TRANSACTIONS_FILTERS_SORT_DIRECTIONS.ASC,
    },
  },
  {
    label: "A to Z",
    id: `${TRANSACTIONS_FILTERS_SORT_KEYS.NAME}-${TRANSACTIONS_FILTERS_SORT_DIRECTIONS.DESC}`,
    config: {
      column: TRANSACTIONS_FILTERS_SORT_KEYS.NAME,
      direction: TRANSACTIONS_FILTERS_SORT_DIRECTIONS.DESC,
    },
  },
  {
    label: "Z to A",
    id: `${TRANSACTIONS_FILTERS_SORT_KEYS.NAME}-${TRANSACTIONS_FILTERS_SORT_DIRECTIONS.ASC}`,
    config: {
      column: TRANSACTIONS_FILTERS_SORT_KEYS.NAME,
      direction: TRANSACTIONS_FILTERS_SORT_DIRECTIONS.ASC,
    },
  },
  {
    label: "Highest",
    id: `${TRANSACTIONS_FILTERS_SORT_KEYS.AMOUNT}-${TRANSACTIONS_FILTERS_SORT_DIRECTIONS.DESC}`,
    config: {
      column: TRANSACTIONS_FILTERS_SORT_KEYS.AMOUNT,
      direction: TRANSACTIONS_FILTERS_SORT_DIRECTIONS.DESC,
    },
  },
  {
    label: "Lowest",
    id: `${TRANSACTIONS_FILTERS_SORT_KEYS.AMOUNT}-${TRANSACTIONS_FILTERS_SORT_DIRECTIONS.ASC}`,
    config: {
      column: TRANSACTIONS_FILTERS_SORT_KEYS.AMOUNT,
      direction: TRANSACTIONS_FILTERS_SORT_DIRECTIONS.ASC,
    },
  },
] as const

export const TRANSACTIONS_FILTERS_CATEGORIES_OPTIONS = [
  {
    label: "All Transactions",
    value: TRANSACTIONS_FILTERS_CATEGORIES_KEYS.ALL,
  },
  ...TRANSACTION_CATEGORIES_OPTIONS,
] as const

export const TRANSACTION_CATEGORY_LABEL_MAPPING: Record<
  TransactionCategory,
  string
> = {
  bills: "Bills",
  dining_out: "Dining out",
  education: "Education",
  entertainment: "Entertainement",
  general: "General",
  groceries: "Groceries",
  lifestyle: "Lifestyle",
  personal_care: "Personal Care",
  transportation: "Transportation",
}
