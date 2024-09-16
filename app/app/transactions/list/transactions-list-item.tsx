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
  // TODO: Handle display on xl screens
  return (
    // Removing some margin bottom on the last item, so that we can keep padding
    // for a smooth hover effect while not adding extra space at the bottom of the page
    <div className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-background group-last-of-type:-mb-4 md:grid md:grid-cols-[7fr_5fr] md:gap-8 md:px-4">
      <div className="flex items-center gap-3 overflow-x-hidden">
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-destructive" />

        <p className="flex w-full flex-col gap-1 overflow-hidden md:flex-row md:items-center md:justify-between">
          <span className="body1 truncate font-bold">{transaction.name}</span>
          <span className="body2 text-grey-500 md:w-[90px] md:flex-shrink-0 xl:w-[120px]">
            {transaction.category}
          </span>
        </p>
      </div>

      <p className="flex flex-shrink-0 flex-col gap-1 text-right md:w-full md:flex-row-reverse md:items-center md:justify-between">
        <span
          className={cn("body1 font-bold md:w-[90px] xl:w-[120px]", {
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
