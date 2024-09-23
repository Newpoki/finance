import { Paper } from "@/components/ui/paper"
import { fetchCurrentUserProfile } from "../../profile/fetch-current-user-profile"
import { TransactionForm } from "../../transaction/transaction-form"
import { fetchTransactionById } from "../../transaction/fetch-transaction-by-id"
import { TransactionEditGoBackButton } from "./transaction-edit-go-back-button"

type TransactionPageProps = {
  params: {
    transactionId: string
  }
}

export default async function TransactionPage({
  params,
}: TransactionPageProps) {
  const fetchCurrentUserProfilePromise = fetchCurrentUserProfile()
  const fetchTransactionPromise = fetchTransactionById(params.transactionId)

  const [currentUserProfile, transaction] = await Promise.all([
    fetchCurrentUserProfilePromise,
    fetchTransactionPromise,
  ])

  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Edit Transaction</h1>
        <TransactionEditGoBackButton />
      </div>

      <Paper className="flex flex-1 flex-col gap-6">
        <TransactionForm
          profile={currentUserProfile}
          transaction={transaction}
        />
      </Paper>
    </div>
  )
}
