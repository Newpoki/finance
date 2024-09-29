"use client"

import { Badge } from "@/components/ui/badge"
import { TransactionCategory } from "../account-transactions-categories-types"
import { Fragment, useCallback, useState } from "react"
import { AccountTransactionsCategoriesListItemUpsertDialog } from "../account-transactions-categories-upsert-dialog"
import { TransactionCategoryIcon } from "@/app/app/transaction/transaction-category-icon"

type AccountTransactionsCategoriesListItemProps = {
  category: TransactionCategory
}

export const AccountTransactionsCategoriesListItem = ({
  category,
}: AccountTransactionsCategoriesListItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleOpenEditDialog = useCallback(() => {
    setIsEditDialogOpen(true)
  }, [])

  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false)
  }, [])

  return (
    <Fragment>
      <Badge
        style={{ backgroundColor: category.color }}
        className="max-w-36 gap-2 hover:brightness-125"
        onClick={handleOpenEditDialog}
      >
        <TransactionCategoryIcon
          className="h-4 w-4 shrink-0"
          name={category.icon_name}
        />
        <span className="truncate">{category.name}</span>
      </Badge>

      <AccountTransactionsCategoriesListItemUpsertDialog
        isOpen={isEditDialogOpen}
        category={category}
        onClose={handleCloseEditDialog}
      />
    </Fragment>
  )
}
