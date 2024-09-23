import Link from "next/link"
import { TransactionsListItem } from "../../transactions/list/transactions-list-item"
import { Separator } from "@/components/ui/separator"
import { OverviewTransactionsListEmpty } from "./overview-transactions-list-empty"
import { OverviewTransactions } from "./overview-transactions-types"

type OverviewTransactionsListProps = {
  transactions: OverviewTransactions
}

export const OverviewTransactionsList = ({
  transactions,
}: OverviewTransactionsListProps) => {
  if (transactions.length === 0) {
    return <OverviewTransactionsListEmpty />
  }

  return (
    <ul className="flex flex-col">
      {transactions.map((transaction) => (
        <li key={transaction.id} className="group">
          <Link href={`/app/transactions/${transaction.id}`}>
            <TransactionsListItem isCompact transaction={transaction} />

            <Separator className="group-last:hidden" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
