import { fetchTransactions } from "./fetch-transactions"
import { TransactionsListItem } from "./transactions-list-item"
import { Separator } from "@/components/ui/separator"
import { TransactionsListPagination } from "./pagination/transactions-list-pagination"
import { ParsedTransactionsSearchParams } from "../parse-transactions-search-params"
import { TransactionsListNoResults } from "./transactions-list-no-results"

type TransactionsListProps = {
  parsedSearchParams: ParsedTransactionsSearchParams
}

export const TransactionsList = async ({
  parsedSearchParams,
}: TransactionsListProps) => {
  const { transactions, totalPages } = await fetchTransactions({
    searchParams: parsedSearchParams,
  })

  //   TODO: Use real error screen
  if (transactions == null) {
    return <div>oh snap</div>
  }

  if (transactions.length === 0) {
    return <TransactionsListNoResults />
  }

  return (
    <div className="flex flex-1 flex-col gap-12">
      <ul>
        {transactions.map((transaction) => {
          return (
            <li key={transaction.id} className="group flex flex-col">
              <TransactionsListItem transaction={transaction} />

              <Separator className="group-last:hidden" />
            </li>
          )
        })}
      </ul>

      {totalPages > 1 && (
        <TransactionsListPagination
          parsedSearchParams={parsedSearchParams}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}
