import { Paper } from "@/components/ui/paper"
import { TransactionForm } from "../../transaction/form/transaction-form"
import { fetchCurrentUserProfile } from "../../account/profile/fetch-current-user-profile"
import { TransactionNewGoBackButton } from "./transaction-new-go-back-button"

export default async function TransactionsAddNewPage() {
  const currentUserProfile = await fetchCurrentUserProfile()

  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Add New Transaction</h1>

        <TransactionNewGoBackButton />
      </div>

      <Paper className="flex flex-1 flex-col gap-6">
        <TransactionForm profile={currentUserProfile} />
      </Paper>
    </div>
  )
}
