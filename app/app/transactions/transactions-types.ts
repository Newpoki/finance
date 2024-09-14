import { Database } from "@/database.types"
import { fetchTransactions } from "./fetch-transactions"

export type Transaction = Database["public"]["Tables"]["transactions"]["Row"]

export type TransactionListItem = NonNullable<
  Awaited<ReturnType<typeof fetchTransactions>>
>[number]

export type TransactionsPageSearchParams = {
  column?: string
  direction?: string
}
