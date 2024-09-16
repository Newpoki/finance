import { Paper } from "@/components/ui/paper"
import { TransactionsFilters } from "./filters/transactions-filters"
import { TransactionsList } from "./list/transactions-list"
import { parseTransactionsSearchParams } from "./parse-transactions-search-params"
import { Suspense } from "react"
import { TransactionsSuspenseFallback } from "./transactions-suspense-fallback"

type TransactionPageProps = {
  searchParams: unknown
}

export default function TransactionsPage({
  searchParams,
}: TransactionPageProps) {
  const parsedSearchParams = parseTransactionsSearchParams(searchParams)

  // As weird as it is, it's the recommended way to
  // display a fallback when updating search parameters
  // https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
  const stringifiedSearchParams = JSON.stringify(parsedSearchParams)

  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Transactions</h1>

      <Paper className="flex flex-1 flex-col gap-6">
        <Suspense
          fallback={<TransactionsSuspenseFallback />}
          key={stringifiedSearchParams}
        >
          <TransactionsFilters parsedSearchParams={parsedSearchParams} />

          <TransactionsList parsedSearchParams={parsedSearchParams} />
        </Suspense>
      </Paper>
    </div>
  )
}
