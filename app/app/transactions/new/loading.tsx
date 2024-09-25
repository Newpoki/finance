import { Button } from "@/components/ui/button"
import { Paper } from "@/components/ui/paper"
import { SkeletonInput } from "@/components/ui/skeleton"
import { TransactionNewGoBackButton } from "./transaction-new-go-back-button"

export default function TransactionNewLoading() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Add New Transaction</h1>

        <TransactionNewGoBackButton />
      </div>

      <Paper className="flex flex-1 flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />

          <Button disabled className="w-full">
            Add transaction
          </Button>
        </div>
      </Paper>
    </div>
  )
}
