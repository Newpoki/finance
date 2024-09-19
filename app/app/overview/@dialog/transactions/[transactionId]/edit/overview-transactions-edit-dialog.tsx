import { Transaction } from "@/app/app/transaction/transaction-types"
import { DialogTitle } from "@/components/ui/dialog"

type OverviewTransactionsEditDialogProps = {
  transaction: Transaction
}

export const OverviewTransactionsEditDialog = async ({
  transaction,
}: OverviewTransactionsEditDialogProps) => {
  return (
    <>
      <DialogTitle>title</DialogTitle>
      <div>{transaction.name}</div>
    </>
  )
}
