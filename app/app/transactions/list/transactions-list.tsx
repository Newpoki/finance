import { fetchTransactions } from "./fetch-transactions"
import { TransactionsPageSearchParams } from "../transactions-types"
import { TransactionsListItem } from "./transactions-list-item"
import { Separator } from "@/components/ui/separator"
import { TransactionsListPagination } from "./transactions-list-pagination"

type TransactionsListProps = {
  searchParams: TransactionsPageSearchParams
}

export const TransactionsList = async ({
  searchParams,
}: TransactionsListProps) => {
  const transactions = await fetchTransactions({ searchParams })

  //   TODO: Use real error screen
  if (transactions == null) {
    return <div>oh snap</div>
  }

  return (
    <div className="flex flex-1 flex-col gap-12">
      <ul>
        {transactions.map((transaction) => {
          return (
            <li key={transaction.id} className="group flex flex-col">
              <TransactionsListItem transaction={transaction} />

              <Separator className="my-4 group-last:hidden" />
            </li>
          )
        })}
      </ul>

      <TransactionsListPagination />
    </div>
  )
}
