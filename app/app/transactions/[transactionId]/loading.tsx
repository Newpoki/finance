import { Paper } from "@/components/ui/paper"
import { Skeleton } from "@/components/ui/skeleton"

export default function TransactionLoading() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Edit Transaction</h1>

      <Paper className="flex flex-1 flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-11 w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-11 w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-11 w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-11 w-full" />
          </div>

          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
        </div>
      </Paper>
    </div>
  )
}
