import { Paper } from "@/components/ui/paper"
import { fetchCurrentUserProfile } from "../../account/profile/fetch-current-user-profile"
import { TransactionForm } from "../../transaction/form/transaction-form"
import { fetchTransactionById } from "../../transaction/fetch-transaction-by-id"
import { TransactionEditGoBackButton } from "./transaction-edit-go-back-button"
import { fetchCurrentUserTransactionCategories } from "../../account/categories/fetch-current-user-transaction-categories"

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
  const fetchCurrentUserTransactionCategoriesPromise =
    fetchCurrentUserTransactionCategories()

  const [currentUserProfile, transaction, transactionCategories] =
    await Promise.all([
      fetchCurrentUserProfilePromise,
      fetchTransactionPromise,
      fetchCurrentUserTransactionCategoriesPromise,
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
          transactionCategories={transactionCategories}
        />
      </Paper>
    </div>
  )
}
