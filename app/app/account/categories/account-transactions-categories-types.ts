import { z } from "zod"
import { fetchCurrentUserTransactionCategories } from "./fetch-current-user-transaction-categories"
import { TRANSACTION_CATEGORIES_ICONS_LIST } from "./account-transactions-categories-constants"

export const accountTransactionsCategoriesFormValuesSchema = z.object({
  id: z.string().uuid().nullable(),
  color: z.string(),
  icon_name: z.enum(TRANSACTION_CATEGORIES_ICONS_LIST),
  name: z.string(),
})

export type AccountTransactionsCategoriesFormValues = z.infer<
  typeof accountTransactionsCategoriesFormValuesSchema
>

export type TransactionCategory = Awaited<
  ReturnType<typeof fetchCurrentUserTransactionCategories>
>[number]
