"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useCallback, useTransition } from "react"
import { deleteTransaction } from "./delete-transaction"
import { Transaction } from "./transaction-types"
import { toast } from "sonner"

type TransactionDeleteAlertDialogProps = {
  transactionId: Transaction["id"]
}

export const TransactionDeleteAlertDialog = ({
  transactionId,
}: TransactionDeleteAlertDialogProps) => {
  const [isDeleting, startTransition] = useTransition()

  const handleDeleteTransaction = useCallback(() => {
    startTransition(async () => {
      const response = await deleteTransaction({ id: transactionId })

      // Not redirecting anything as we're redirecting from server side
      if (response == null) {
        toast.success("Transaction has beeen deleted")

        return
      }

      if (response.type === "generic") {
        toast.error(response.message)
      }
    })
  }, [transactionId])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="error" className="w-full" type="button">
          Delete Transaction
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={handleDeleteTransaction}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
