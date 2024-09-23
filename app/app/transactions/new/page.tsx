import { Paper } from "@/components/ui/paper"
import { TransactionForm } from "../../transaction/transaction-form"
import { fetchCurrentUserProfile } from "../../profile/fetch-current-user-profile"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CarretLeft from "@/icons/carret-left.svg"

export default async function TransactionsAddNewPage() {
  const currentUserProfile = await fetchCurrentUserProfile()

  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Add New Transaction</h1>

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
        <TransactionForm profile={currentUserProfile} />
      </Paper>
    </div>
  )
}
