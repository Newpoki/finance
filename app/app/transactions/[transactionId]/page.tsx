import { Paper } from "@/components/ui/paper"
import { fetchCurrentUserProfile } from "../../profile/fetch-current-user-profile"
import { TransactionForm } from "../../transaction/transaction-form"
import { fetchTransactionById } from "../../transaction/fetch-transaction-by-id"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CarretLeft from "@/icons/carret-left.svg"

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

        <Link href="/app/transactions">
          <Button className="flex md:hidden" size="icon" variant="ghost">
            <CarretLeft />
          </Button>
          <Button className="hidden gap-2 md:flex">
            <CarretLeft />

            <span>Go Back</span>
          </Button>
        </Link>
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
