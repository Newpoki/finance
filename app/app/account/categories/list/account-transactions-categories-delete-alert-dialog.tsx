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
import { useCallback, useTransition } from "react"
import { toast } from "sonner"
import { deleteTransactionCategory } from "../delete-transaction-category"
import { TransactionCategory } from "../account-transactions-categories-types"
import { XIcon } from "lucide-react"

type AccountTransactionsCategoriesDeleteAlertDialogProps = {
  transactionCategoryId: TransactionCategory["id"]
}

export const AccountTransactionsCategoriesDeleteAlertDialog = ({
  transactionCategoryId,
}: AccountTransactionsCategoriesDeleteAlertDialogProps) => {
  const [isDeleting, startTransition] = useTransition()

  const handleDeleteTransactionCategory = useCallback(() => {
    startTransition(async () => {
      const response = await deleteTransactionCategory({
        id: transactionCategoryId,
      })

      if (response.type === "success") {
        toast.success("Transaction category has beeen deleted")

        return
      }

      if (response.type === "generic") {
        toast.error(response.message)
      }
    })
  }, [transactionCategoryId])

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <XIcon className="h-4 w-4" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            transaction category. All existing transactions with this category
            will be deleted
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={handleDeleteTransactionCategory}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
