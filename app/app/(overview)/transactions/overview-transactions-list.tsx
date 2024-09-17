import { Paper } from "@/components/ui/paper"
import { fetchOverviewTransactions } from "./fetch-overview-transactions"
import { TransactionsListItem } from "../../transactions/list/transactions-list-item"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CarretLeft from "@/icons/carret-left.svg"

export const OverviewTransactionsList = async () => {
  const data = await fetchOverviewTransactions()

  return (
    <Paper className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2>Transactions</h2>

        <Button variant="ghost" className="-mr-4 -mt-4" asChild>
          <Link href="/app/transactions" className="flex items-center gap-3">
            <span>View All</span>
            <CarretLeft className="rotate-180" />
          </Link>
        </Button>
      </div>

      <ul className="flex flex-col">
        {data?.map((transaction) => (
          <li key={transaction.id}>
            <TransactionsListItem isCompact transaction={transaction} />

            <Separator className="group-last:hidden" />
          </li>
        ))}
      </ul>
    </Paper>
  )
}
