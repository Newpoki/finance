import { Paper } from "@/components/ui/paper"
import { TransactionsFilters } from "./filters/transactions-filters"
import { TransactionsList } from "./list/transactions-list"
import { TransactionsPageSearchParams } from "./transactions-types"

type TransactionPageProps = {
  searchParams: TransactionsPageSearchParams
}

export default async function TransactionsPage({
  searchParams,
}: TransactionPageProps) {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Transactions</h1>

      <Paper className="flex flex-1 flex-col gap-6">
        <TransactionsFilters searchParams={searchParams} />

        <TransactionsList searchParams={searchParams} />
      </Paper>
    </div>
  )
}
