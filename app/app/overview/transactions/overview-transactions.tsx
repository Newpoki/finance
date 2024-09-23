import { Paper } from "@/components/ui/paper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CarretLeft from "@/icons/carret-left.svg"
import { OverviewTransactionsList } from "./overview-transactions-list"
import { fetchOverviewTransactions } from "./fetch-overview-transactions"
import { PlusIcon } from "lucide-react"

export const OverviewTransactions = async () => {
  const transactions = await fetchOverviewTransactions()

  const areTransactionsEmpty = transactions.length === 0

  return (
    <Paper className="flex flex-col gap-4">
      <div className="-mr-4 -mt-4 flex items-center justify-between gap-2">
        <h2>Transactions</h2>

        <Button variant="ghost" asChild>
          <Link
            href={
              areTransactionsEmpty
                ? "/app/transactions/new"
                : "/app/transactions"
            }
            className="flex items-center gap-3"
          >
            <span>{areTransactionsEmpty ? "Add transaction" : "View All"}</span>
            {areTransactionsEmpty ? (
              <PlusIcon className="h-5 w-5" />
            ) : (
              <CarretLeft className="rotate-180" />
            )}
          </Link>
        </Button>
      </div>

      <OverviewTransactionsList transactions={transactions} />
    </Paper>
  )
}
