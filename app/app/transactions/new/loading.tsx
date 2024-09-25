import { Paper } from "@/components/ui/paper"
import { Skeleton, SkeletonInput } from "@/components/ui/skeleton"

export default function TransactionNewLoading() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Add New Transaction</h1>

      <Paper className="flex flex-1 flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />

          <Skeleton className="h-11 w-full" />

          <Skeleton className="h-11 w-full" />
        </div>
      </Paper>
    </div>
  )
}
