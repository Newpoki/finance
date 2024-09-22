"use client"

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { OverviewTransactionsDialogWrapper } from "./overview-transactions-dialog-wrapper"
import { Skeleton } from "@/components/ui/skeleton"

export default function OverviewTransactionsEditDialogLoading() {
  return (
    <OverviewTransactionsDialogWrapper redirectUrl="/app/overview">
      <DialogHeader>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogDescription>
          Choose a category to set a transaction. These categories can help you
          monitor spending.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4">
        <Skeleton className="h-11 w-[280px]" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    </OverviewTransactionsDialogWrapper>
  )
}
