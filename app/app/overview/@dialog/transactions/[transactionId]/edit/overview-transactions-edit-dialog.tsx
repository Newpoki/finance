"use client"

import { Profile } from "@/app/app/profile/profile-types"
import { TransactionForm } from "@/app/app/transaction/transaction-form"
import { Transaction } from "@/app/app/transaction/transaction-types"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type OverviewTransactionsEditDialogProps = {
  transaction: Transaction
  profile: Profile
}

export const OverviewTransactionsEditDialog = ({
  transaction,
  profile,
}: OverviewTransactionsEditDialogProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogDescription>
          Choose a category to set a transaction. These categories can help you
          monitor spending.
        </DialogDescription>
      </DialogHeader>

      <TransactionForm transaction={transaction} profile={profile} />
    </>
  )
}
