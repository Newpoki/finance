"use client"

import { DialogTitle } from "@/components/ui/dialog"
import { OverviewTransactionsDialogWrapper } from "./overview-transactions-dialog-wrapper"

export default function OverviewTransactionsEditDialogError() {
  // TODO: Create real error page
  return (
    <OverviewTransactionsDialogWrapper redirectUrl="/app/overview">
      <DialogTitle>Oh no, anyway</DialogTitle>
    </OverviewTransactionsDialogWrapper>
  )
}
