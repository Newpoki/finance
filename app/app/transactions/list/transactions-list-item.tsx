import { formatCents } from "@/currency/format-cents"
import { TransactionListItem } from "../transactions-types"
import { formatDate } from "@/utils/date/format-date"
import { cn } from "@/lib/utils"

type TransactionsListItemProps = {
  isCompact?: boolean
  transaction: TransactionListItem
}

export const TransactionsListItem = ({
  isCompact = false,
  transaction,
}: TransactionsListItemProps) => {
  return (
    // Removing some margin bottom on the last item, so that we can keep padding
    // for a smooth hover effect while not adding extra space at the bottom of the page
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-4 transition-colors hover:bg-background group-last-of-type:-mb-4 xl:px-4",
        {
          "md:grid md:grid-cols-[7fr_5fr] md:gap-8 md:px-4": !isCompact,
        },
      )}
    >
      <div className="flex items-center gap-3 overflow-x-hidden">
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-destructive" />

        <p
          className={cn("flex w-full flex-col gap-1 overflow-hidden", {
            "md:flex-row md:items-center md:justify-between": !isCompact,
          })}
        >
          <span className="body1 truncate font-bold">{transaction.name}</span>
          <span
            className={cn("body2 flex-shrink-0 text-grey-500", {
              "md:w-[90px] xl:w-[120px]": !isCompact,
            })}
          >
            {transaction.category}
          </span>
        </p>
      </div>

      <p
        className={cn("flex flex-shrink-0 flex-col gap-1 text-right", {
          "md:w-full md:flex-row-reverse md:items-center md:justify-between":
            !isCompact,
        })}
      >
        <span
          className={cn("body1 font-bold", {
            "text-green-500": transaction.amount_cents > 0,
            "md:w-[90px] xl:w-[120px]": !isCompact,
          })}
        >
          {formatCents({
            cents: transaction.amount_cents,
            locale: "fr-FR",
            currencyCode: "EUR",
          })}
        </span>
        <span className="body2 text-grey-500">
          {formatDate(transaction.date)}
        </span>
      </p>
    </div>
  )
}
