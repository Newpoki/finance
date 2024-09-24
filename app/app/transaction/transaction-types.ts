import { z } from "zod"
import { fetchTransactionById } from "./fetch-transaction-by-id"
import { Database } from "@/database.types"
import { TRANSACTION_CATEGORIES } from "./transaction-constants"

export type Transaction = NonNullable<
  Awaited<ReturnType<typeof fetchTransactionById>>
>

export type TransactionCategory =
  Database["public"]["Enums"]["transaction_categories"]

export const transactionFormValuesSchema = z.object({
  id: z.string().nullable(),
  name: z.string().min(1, "Name is required"),
  category: z.enum([
    TRANSACTION_CATEGORIES.BILLS,
    TRANSACTION_CATEGORIES.DINING_OUT,
    TRANSACTION_CATEGORIES.ENTERTAINMENT,
    TRANSACTION_CATEGORIES.GENERAL,
    TRANSACTION_CATEGORIES.GROCERIES,
    TRANSACTION_CATEGORIES.LIFESTYLE,
    TRANSACTION_CATEGORIES.PERSONAL_CARE,
    TRANSACTION_CATEGORIES.TRANSPORTATION,
    TRANSACTION_CATEGORIES.EDUCATION,
  ]),
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
