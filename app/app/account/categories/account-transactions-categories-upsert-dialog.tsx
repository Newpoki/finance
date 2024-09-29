import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { TransactionCategory } from "./account-transactions-categories-types"
import { AccountTransactionsCategoriesForm } from "./form/account-transactions-categories-form"

type AccountTransactionsCategoriesListItemUpsertDialogProps = {
  category?: TransactionCategory
  isOpen: boolean
  onClose: () => void
}

export const AccountTransactionsCategoriesListItemUpsertDialog = ({
  category,
  isOpen,
  onClose,
}: AccountTransactionsCategoriesListItemUpsertDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category == null
              ? "Create Transaction Category"
              : "Edit Transaction Category"}
          </DialogTitle>
        </DialogHeader>

        <AccountTransactionsCategoriesForm
          category={category}
          onSuccess={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}
