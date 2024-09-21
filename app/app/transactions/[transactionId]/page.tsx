import { fetchCurrentUserProfile } from "../../profile/fetch-current-user-profile"
import { TransactionForm } from "../../transaction/transaction-form"

export default async function TransactionPage() {
  const currentProfile = await fetchCurrentUserProfile()
  return (
    <div>
      <p>Hi ! I&apos;m transaction page</p>

      <TransactionForm profile={currentProfile} transaction={undefined} />
    </div>
  )
}
