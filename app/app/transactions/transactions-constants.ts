import { TransactionCategory } from "./transactions-types"

export const TRANSACTIONS_SORT_DIRECTIONS = {
  DESC: "DESC",
  ASC: "ASC",
} as const

export const TRANSACTIONS_SORT_KEYS = {
  AMOUNT: "amount_cents",
  NAME: "name",
  DATE: "date",
} as const

export const TRANSACTIONS_CATEGORY_KEYS = {
  ALL: "all",
  GENERAL: "general",
  ENTERTAINMENT: "entertainment",
  BILLS: "bills",
  GROCERIES: "groceries",
  DINING_OUT: "dining_out",
  TRANSPORTATION: "transportation",
  PERSONAL_CARE: "personal_care",
  LIFESTYLE: "lifestyle",
} as const

export const TRANSACTIONS_SORT_OPTIONS = [
  {
    label: "Latest",
    id: `${TRANSACTIONS_SORT_KEYS.DATE}-${TRANSACTIONS_SORT_DIRECTIONS.DESC}`,
    config: {
      column: TRANSACTIONS_SORT_KEYS.DATE,
      direction: TRANSACTIONS_SORT_DIRECTIONS.DESC,
    },
  },
  {
    label: "Oldest",
    id: `${TRANSACTIONS_SORT_KEYS.DATE}-${TRANSACTIONS_SORT_DIRECTIONS.ASC}`,
    config: {
      column: TRANSACTIONS_SORT_KEYS.DATE,
      direction: TRANSACTIONS_SORT_DIRECTIONS.ASC,
    },
  },
  {
    label: "A to Z",
    id: `${TRANSACTIONS_SORT_KEYS.NAME}-${TRANSACTIONS_SORT_DIRECTIONS.DESC}`,
    config: {
      column: TRANSACTIONS_SORT_KEYS.NAME,
      direction: TRANSACTIONS_SORT_DIRECTIONS.DESC,
    },
  },
  {
    label: "Z to A",
    id: `${TRANSACTIONS_SORT_KEYS.NAME}-${TRANSACTIONS_SORT_DIRECTIONS.ASC}`,
    config: {
      column: TRANSACTIONS_SORT_KEYS.NAME,
      direction: TRANSACTIONS_SORT_DIRECTIONS.ASC,
    },
  },
  {
    label: "Highest",
    id: `${TRANSACTIONS_SORT_KEYS.AMOUNT}-${TRANSACTIONS_SORT_DIRECTIONS.DESC}`,
    config: {
      column: TRANSACTIONS_SORT_KEYS.AMOUNT,
      direction: TRANSACTIONS_SORT_DIRECTIONS.DESC,
    },
  },
  {
    label: "Lowest",
    id: `${TRANSACTIONS_SORT_KEYS.AMOUNT}-${TRANSACTIONS_SORT_DIRECTIONS.ASC}`,
    config: {
      column: TRANSACTIONS_SORT_KEYS.AMOUNT,
      direction: TRANSACTIONS_SORT_DIRECTIONS.ASC,
    },
  },
] as const

export const TRANSACTIONS_CATEGORY_OPTIONS = [
  { label: "All Transactions", value: TRANSACTIONS_CATEGORY_KEYS.ALL },
  { label: "General", value: TRANSACTIONS_CATEGORY_KEYS.GENERAL },
  { label: "Groceries", value: TRANSACTIONS_CATEGORY_KEYS.GROCERIES },
  { label: "Bills", value: TRANSACTIONS_CATEGORY_KEYS.BILLS },
  {
    label: "Transportations",
    value: TRANSACTIONS_CATEGORY_KEYS.TRANSPORTATION,
  },
  { label: "Entertainment", value: TRANSACTIONS_CATEGORY_KEYS.ENTERTAINMENT },
  { label: "Dining out", value: TRANSACTIONS_CATEGORY_KEYS.DINING_OUT },
  { label: "Personal Care", value: TRANSACTIONS_CATEGORY_KEYS.PERSONAL_CARE },
  { label: "Lifestyle", value: TRANSACTIONS_CATEGORY_KEYS.LIFESTYLE },
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
