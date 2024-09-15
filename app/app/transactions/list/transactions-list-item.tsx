import { formatCents } from "@/utils/currency/format-cents"
import { TransactionListItem } from "../transactions-types"
import { formatDate } from "@/utils/date/format-date"
import { cn } from "@/lib/utils"

type TransactionsListItemProps = {
  transaction: TransactionListItem
}

export const TransactionsListItem = ({
  transaction,
}: TransactionsListItemProps) => {
  return (
    <div className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-background md:px-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-destructive" />

        <p className="flex flex-col gap-1">
          <span className="body1 font-bold">{transaction.name}</span>
          <span className="body2 text-grey-500">{transaction.category}</span>
        </p>
      </div>

      <p className="flex flex-col gap-1 text-right">
        <span
          className={cn("body1 font-bold", {
            "text-green-500": transaction.amount_cents > 0,
          })}
        >
          {formatCents(transaction.amount_cents)}
        </span>
        <span className="body2 text-grey-500">
          {formatDate(transaction.date)}
        </span>
      </p>
    </div>
  )
}
