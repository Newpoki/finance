import { fetchTransactions } from "./fetch-transactions"
import { TransactionsListItem } from "./transactions-list-item"
import { Separator } from "@/components/ui/separator"
import { TransactionsListPagination } from "./pagination/transactions-list-pagination"
import { ParsedTransactionsSearchParams } from "../parse-transactions-search-params"
import { TransactionsListNoResults } from "./transactions-list-no-results"
import { TransactionsListEmpty } from "./transactions-list-empty"
import Link from "next/link"

type TransactionsListProps = {
  parsedSearchParams: ParsedTransactionsSearchParams
}

export const TransactionsList = async ({
  parsedSearchParams,
}: TransactionsListProps) => {
  const { transactions, totalPages, totalCount } = await fetchTransactions({
    searchParams: parsedSearchParams,
  })

  if (totalCount === 0) {
    return <TransactionsListEmpty />
  }

  if (transactions.length === 0) {
    return <TransactionsListNoResults />
  }

  return (
    <div className="flex flex-1 flex-col gap-12">
      <ul>
        {transactions.map((transaction) => {
          return (
            <li key={transaction.id} className="group">
              <Link href={`/app/transactions/${transaction.id}`}>
                <TransactionsListItem transaction={transaction} />

                <Separator className="group-last:hidden" />
              </Link>
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
