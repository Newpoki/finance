import { Paper } from "@/components/ui/paper"
import { TransactionsFilter } from "./transactions-filter"

export default function TransactionsPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Transactions</h1>

      <Paper className="flex flex-1 flex-col">
        <TransactionsFilter />
      </Paper>
    </div>
  )
}
