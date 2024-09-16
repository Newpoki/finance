import { Database } from "@/database.types"
import { fetchTransactions } from "./list/fetch-transactions"

export type Transaction = Database["public"]["Tables"]["transactions"]["Row"]

export type TransactionListItem = NonNullable<
  Awaited<ReturnType<typeof fetchTransactions>>["transactions"]
>
