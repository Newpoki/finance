import { fetchTransactions } from "./list/fetch-transactions"

export type TransactionListItem = NonNullable<
  Awaited<ReturnType<typeof fetchTransactions>>["transactions"]
>[number]
