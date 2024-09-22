import { Paper } from "@/components/ui/paper"
import { TransactionForm } from "../../transaction/transaction-form"
import { fetchCurrentUserProfile } from "../../profile/fetch-current-user-profile"

export default async function TransactionsAddNewPage() {
  const currentUserProfile = await fetchCurrentUserProfile()

  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Add Transaction</h1>

      <Paper className="flex flex-1 flex-col gap-6">
        <TransactionForm profile={currentUserProfile} />
      </Paper>
    </div>
  )
}
