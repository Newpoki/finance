"use client"

import { DialogTitle } from "@/components/ui/dialog"
import { OverviewTransactionsDialogWrapper } from "./overview-transactions-dialog-wrapper"

export default function OverviewTransactionsEditDialogLoading() {
  // TODO: Create real loading page
  return (
    <OverviewTransactionsDialogWrapper redirectUrl="/app/overview">
      <DialogTitle>Loading</DialogTitle>
    </OverviewTransactionsDialogWrapper>
  )
}
