import { Paper } from "@/components/ui/paper"
import { fetchCurrentUserTransactionCategories } from "./fetch-current-user-transaction-categories"
import { AccountTransactionsCategoriesList } from "./list/account-transactions-categories-list"

export const AccountTransactionsCategories = async () => {
  const currentUserTransactionCategories =
    await fetchCurrentUserTransactionCategories()

  return (
    <Paper className="flex flex-col gap-4">
      <h2>Transactions Categories</h2>

      <p className="text-grey-500">
        Here you can edit your available categories to fit your needs. Click on
        a category to edit or delete it.
      </p>

      <AccountTransactionsCategoriesList
        categories={currentUserTransactionCategories}
      />
    </Paper>
  )
}
