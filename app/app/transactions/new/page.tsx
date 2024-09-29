import { Paper } from "@/components/ui/paper"
import { TransactionForm } from "../../transaction/form/transaction-form"
import { fetchCurrentUserProfile } from "../../account/profile/fetch-current-user-profile"
import { TransactionNewGoBackButton } from "./transaction-new-go-back-button"
import { fetchCurrentUserTransactionCategories } from "../../account/categories/fetch-current-user-transaction-categories"

export default async function TransactionsAddNewPage() {
  const fetchCurrentUserProfilePromise = fetchCurrentUserProfile()
  const fetchCurrentUserTransactionCategoriesPromise =
    fetchCurrentUserTransactionCategories()

  const [currentUserProfile, transactionCategories] = await Promise.all([
    fetchCurrentUserProfilePromise,
    fetchCurrentUserTransactionCategoriesPromise,
  ])

  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Add New Transaction</h1>

        <TransactionNewGoBackButton />
      </div>

      <Paper className="flex flex-1 flex-col gap-6">
        <TransactionForm
          profile={currentUserProfile}
          transactionCategories={transactionCategories}
        />
      </Paper>
    </div>
  )
}
