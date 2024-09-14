export const TRANSACTIONS_SORT_DIRECTIONS = {
  DESC: "DESC",
  ASC: "ASC",
} as const

export const TRANSACTIONS_SORT_KEYS = {
  AMOUNT: "amount_cents",
  CATEGORY: "category",
  CREATED_AT: "created_at",
} as const
