import { formatCents } from "@/currency/format-cents"
import { TransactionListItem } from "../transactions-types"
import { formatDate } from "@/date/format-date"
import { cn } from "@/lib/utils"
import { fetchCurrentUserProfile } from "../../account/profile/fetch-current-user-profile"
import { fetchTransactionCategoryById } from "../../account/categories/fetch-transaction-category-by-id"
import { TransactionCategoryIcon } from "../../transaction/transaction-category-icon"
import { Badge } from "@/components/ui/badge"

type TransactionsListItemProps = {
  isCompact?: boolean
  transaction: TransactionListItem
}

export const TransactionsListItem = async ({
  isCompact = false,
  transaction,
}: TransactionsListItemProps) => {
  const fetchCurrentUserProfilePromise = fetchCurrentUserProfile()
  const fetchTransactionCategoryByIdPromise = fetchTransactionCategoryById(
    transaction.category,
  )

  const [currentUserProfile, transactionCategory] = await Promise.all([
    fetchCurrentUserProfilePromise,
    fetchTransactionCategoryByIdPromise,
  ])

  const displayedDate = formatDate({
    date: transaction.date,
    locale: currentUserProfile.locale,
    timeZone: currentUserProfile.timezone,
  })

  return (
    // Removing some margin bottom on the last item, so that we can keep padding
    // for a smooth hover effect while not adding extra space at the bottom of the page
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-background group-last-of-type:-mb-4",
        {
          "md:grid md:grid-cols-[7fr_5fr] md:gap-8": !isCompact,
        },
      )}
    >
      <div className="flex items-center gap-3 overflow-x-hidden">
        <div
          className={cn(
            "flex w-full flex-col gap-x-4 gap-y-2 overflow-hidden",
            {
              "md:flex-row-reverse md:items-center md:justify-end": !isCompact,
            },
          )}
        >
          <span className="body1 truncate font-bold">{transaction.name}</span>
          <span
            className={cn("body2 text-grey-500", {
              "md:w-[90px] xl:w-[120px]": !isCompact,
            })}
          >
            <Badge
              style={{ backgroundColor: transactionCategory.color }}
              // w-full so it the content text-ellipsis can work
              className="w-full gap-2"
            >
              <TransactionCategoryIcon
                className="h-4 w-4 shrink-0"
                name={transactionCategory.icon_name}
              />
              <span className="truncate">{transactionCategory.name}</span>
            </Badge>
          </span>
        </div>
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
            locale: currentUserProfile.locale,
            currencyCode: transaction.currency_code,
          })}
        </span>
        <span className="body2 text-grey-500">{displayedDate}</span>
      </p>
    </div>
  )
}
