import { Paper } from "@/components/ui/paper"
import { TransactionsFilters } from "./filters/transactions-filters"
import { TransactionsList } from "./list/transactions-list"
import { parseTransactionsSearchParams } from "./parse-transactions-search-params"
import { TransactionsAddNewButton } from "./transactions-add-new-button"
import { fetchCurrentUserTransactionCategories } from "../account/categories/fetch-current-user-transaction-categories"

type TransactionPageProps = {
  searchParams: unknown
}

export default async function TransactionsPage({
  searchParams,
}: TransactionPageProps) {
  const parsedSearchParams = parseTransactionsSearchParams(searchParams)
  const currentUserTransactionCategories =
    await fetchCurrentUserTransactionCategories()

  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Transactions</h1>
        <TransactionsAddNewButton />
      </div>

      <Paper className="flex flex-1 flex-col gap-6">
        <TransactionsFilters
          parsedSearchParams={parsedSearchParams}
          transactionCategories={currentUserTransactionCategories}
        />

        <TransactionsList parsedSearchParams={parsedSearchParams} />
      </Paper>
    </div>
  )
}
