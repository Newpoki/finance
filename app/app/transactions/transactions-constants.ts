export const TRANSACTIONS_SORT_DIRECTIONS = {
  DESC: "DESC",
  ASC: "ASC",
} as const

export const TRANSACTIONS_SORT_KEYS = {
  AMOUNT: "amount_cents",
  NAME: "name",
  DATE: "date",
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
