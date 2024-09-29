import { z } from "zod"
import { fetchTransactionById } from "./fetch-transaction-by-id"
import { Database } from "@/database.types"

export type Transaction = NonNullable<
  Awaited<ReturnType<typeof fetchTransactionById>>
>

export const transactionFormValuesSchema = z.object({
  id: z.string().nullable(),
  name: z.string().min(1, "Name is required"),
  category: z.string(),
  date: z.date(),
  amount: z
    .number()
    .nullable()
    .refine((value) => {
      return !!value
    }, "Value is required"),
  isExpense: z.boolean(),
})

export type TransactionFormValues = z.infer<typeof transactionFormValuesSchema>

export type TransactionCategoryIcons =
  Database["public"]["Enums"]["transaction_categories_icons"]
