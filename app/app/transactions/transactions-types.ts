import { Database } from "@/database.types"
import { fetchTransactions } from "./list/fetch-transactions"

export type TransactionListItem = NonNullable<
  Awaited<ReturnType<typeof fetchTransactions>>["transactions"]
>[number]

export type TransactionCategory =
  Database["public"]["Enums"]["transaction_categories"]
