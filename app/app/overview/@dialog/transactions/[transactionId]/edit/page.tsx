import { OverviewTransactionsEditDialog } from "./overview-transactions-edit-dialog"
import { OverviewTransactionsDialogWrapper } from "./overview-transactions-dialog-wrapper"
import { fetchTransactionById } from "@/app/app/transaction/fetch-transaction-by-id"

type OverviewTransactionEditDialogPageProps = {
  params: {
    transactionId: string
  }
}

export default async function OverviewTransactionsEditDialogPage({
  params,
}: OverviewTransactionEditDialogPageProps) {
  const transaction = await fetchTransactionById(params.transactionId)

  return (
    <OverviewTransactionsDialogWrapper redirectUrl="/app/overview">
      <OverviewTransactionsEditDialog transaction={transaction} />
    </OverviewTransactionsDialogWrapper>
  )
}
