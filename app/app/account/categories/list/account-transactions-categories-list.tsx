"use client"

import { Button } from "@/components/ui/button"
import { TransactionCategory } from "../account-transactions-categories-types"
import { AccountTransactionsCategoriesListItem } from "./account-transactions-categories-list-item"
import { Fragment, useCallback, useState } from "react"
import { AccountTransactionsCategoriesListItemUpsertDialog } from "../account-transactions-categories-upsert-dialog"
import { AccountTransactionsCategoriesDeleteAlertDialog } from "./account-transactions-categories-delete-alert-dialog"

type AccountTransactionsCategoriesListProps = {
  categories: TransactionCategory[]
}
export const AccountTransactionsCategoriesList = ({
  categories,
}: AccountTransactionsCategoriesListProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleOpenCreateDialog = useCallback(() => {
    setIsCreateDialogOpen(true)
  }, [])

  const handleCloseCreateDialog = useCallback(() => {
    setIsCreateDialogOpen(false)
  }, [])

  return (
    <Fragment>
      <ul className="flex max-h-52 flex-wrap gap-2 overflow-auto">
        {categories.map((category) => {
          return (
            <li key={category.id} className="flex items-center gap-2">
              <AccountTransactionsCategoriesListItem category={category} />

              {categories.length > 1 ? (
                <AccountTransactionsCategoriesDeleteAlertDialog
                  transactionCategoryId={category.id}
                />
              ) : null}
            </li>
          )
        })}
      </ul>

      <Button onClick={handleOpenCreateDialog} type="button">
        Add New Transaction Category
      </Button>

      <AccountTransactionsCategoriesListItemUpsertDialog
        isOpen={isCreateDialogOpen}
        onClose={handleCloseCreateDialog}
      />
    </Fragment>
  )
}
