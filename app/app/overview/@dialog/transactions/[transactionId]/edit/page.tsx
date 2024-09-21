import { OverviewTransactionsEditDialog } from "./overview-transactions-edit-dialog"
import { OverviewTransactionsDialogWrapper } from "./overview-transactions-dialog-wrapper"
import { fetchTransactionById } from "@/app/app/transaction/fetch-transaction-by-id"
import { fetchCurrentUserProfile } from "@/app/app/profile/fetch-current-user-profile"

type OverviewTransactionEditDialogPageProps = {
  params: {
    transactionId: string
  }
}

export default async function OverviewTransactionsEditDialogPage({
  params,
}: OverviewTransactionEditDialogPageProps) {
  const transactionPromise = fetchTransactionById(params.transactionId)
  const profilePromise = fetchCurrentUserProfile()

  const [transaction, profile] = await Promise.all([
    transactionPromise,
    profilePromise,
  ])

  return (
    <OverviewTransactionsDialogWrapper redirectUrl="/app/overview">
      <OverviewTransactionsEditDialog
        transaction={transaction}
        profile={profile}
      />
    </OverviewTransactionsDialogWrapper>
  )
}
