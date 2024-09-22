"use client"

import { DialogTitle } from "@/components/ui/dialog"
import { OverviewTransactionsDialogWrapper } from "./overview-transactions-dialog-wrapper"
import ErrorIllustration from "@/public/illustrations/error-illustration.svg"

export default function OverviewTransactionsEditDialogError() {
  return (
    <OverviewTransactionsDialogWrapper redirectUrl="/app/overview">
      <DialogTitle>Edit Transaction</DialogTitle>
      <div className="flex flex-1 flex-col">
        <ErrorIllustration className="max-w-[400px] xl:max-w-[600px]" />
        <div className="flex w-full flex-col items-center text-center">
          <h2 className="font-bold">Oh no, something is broken</h2>
          <p className="mb-4">
            An unexpected error happen, thus we don&apos;t know why it id. Close
            the dialog and try again later.
          </p>
        </div>
      </div>
    </OverviewTransactionsDialogWrapper>
  )
}
