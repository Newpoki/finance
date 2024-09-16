import { Paper } from "@/components/ui/paper"
import { TransactionsSuspenseFallback } from "./transactions-suspense-fallback"

/**
 * This is the displayed component the first time the `/transactions` page is fetched
 */
export default function TransactionsLoading() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Transactions</h1>

      <Paper className="flex flex-1 flex-col gap-6">
        <TransactionsSuspenseFallback />
      </Paper>
    </div>
  )
}
