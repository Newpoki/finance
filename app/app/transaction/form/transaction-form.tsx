"use client"

import { FieldPath, useForm } from "react-hook-form"
import {
  Transaction,
  TransactionFormValues,
  transactionFormValuesSchema,
} from "../transaction-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useMemo, useTransition } from "react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { upsertTransactionAction } from "../transaction-actions"
import { toast } from "sonner"
import { TransactionDeleteAlertDialog } from "../transaction-delete-alert-dialog"
import { useRouter } from "next/navigation"
import { formatToCents } from "@/currency/format-to-cents"
import { TransactionFormAmountField } from "./transaction-form-amount-field"
import { Profile } from "../../account/profile/account-profile-types"
import { ControlledInput } from "@/components/rhk/controlled-input"
import { ControlledDayPicker } from "@/components/rhk/controlled-day-picker"
import { ControlledSelect } from "@/components/rhk/controlled-select"
import { TransactionCategoryIcon } from "../transaction-category-icon"
import { TransactionCategory } from "../../account/categories/account-transactions-categories-types"

type TransactionFormProps = {
  transaction?: Transaction
  profile: Profile
  transactionCategories: TransactionCategory[]
}

export const TransactionForm = ({
  transaction,
  profile,
  transactionCategories,
}: TransactionFormProps) => {
  const router = useRouter()

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormValuesSchema),
    defaultValues: {
      amount:
        transaction?.amount_cents != null
          ? // Inside of the form with working with an absolute value
            // Being a negative amount or not is handlded by a boolean field
            Math.abs(transaction.amount_cents) / 100
          : null,
      //  Safe to cast as there can't be less than one element here
      category:
        transaction?.category ?? (transactionCategories[0]?.id as string),
      date: transaction?.date != null ? new Date(transaction.date) : new Date(),
      id: transaction?.id ?? null,
      name: transaction?.name ?? "",
      isExpense: transaction?.amount_cents
        ? transaction.amount_cents < 0
        : true,
    },
  })

  const [isSubmitting, startTransition] = useTransition()

  const transactionCategoriesOption = useMemo(
    () =>
      transactionCategories.map((category) => {
        return {
          label: category.name,
          value: category.id,
          icon: category.icon_name,
        }
      }),
    [transactionCategories],
  )

  const onSubmit = useCallback(
    (formValues: TransactionFormValues) => {
      startTransition(async () => {
        if (formValues.amount == null) {
          throw new Error(
            "Specified amount is null, this shouldn't be possible at this point as it should have been parsed by zod",
          )
        }

        const response = await upsertTransactionAction({
          ...formValues,
          amount: formatToCents(
            // As we're working with an absolute amount inside of form
            // We must convert it back when sending to the API
            formValues.isExpense ? -formValues.amount : formValues.amount,
          ),
        })

        if (response.type === "success") {
          toast.success(
            transaction != null
              ? "Transaction has been edited"
              : "Transaction has been created",
          )
          router.back()

          return
        }

        if (response.type === "generic") {
          form.setError("root", { message: response.message })
          return
        }

        response.fields.forEach((field) => {
          form.setError(field.path as FieldPath<TransactionFormValues>, {
            message: field.message,
          })
        })
      })
    },
    [form, router, transaction],
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-1 flex-col gap-4"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr]">
          <ControlledInput
            name="name"
            control={form.control}
            label="Name"
            disabled={isSubmitting}
            placeholder="Carrefour"
            required
          />

          <TransactionFormAmountField
            isSubmitting={isSubmitting}
            profile={profile}
            transaction={transaction}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr]">
          <ControlledDayPicker
            name="date"
            control={form.control}
            label="Date"
            disabled={isSubmitting}
          />

          <ControlledSelect
            // The min-w-0 seems useless but it's an hack so the column respect the grid-tempalte-cols
            // https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items
            className="min-w-0"
            control={form.control}
            disabled={isSubmitting}
            name="category"
            label="Budget Category"
            options={transactionCategoriesOption}
            renderOption={(option) => {
              return (
                <div className="flex items-center gap-2">
                  <TransactionCategoryIcon name={option.icon} />
                  <span className="truncate">{option.label}</span>
                </div>
              )
            }}
            renderValue={(option) => {
              return option != null ? (
                <div className="flex items-center gap-2">
                  <TransactionCategoryIcon name={option.icon} />
                  <span className="truncate">{option.label}</span>
                </div>
              ) : (
                "Please select a category"
              )
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {transaction != null && (
            <TransactionDeleteAlertDialog transactionId={transaction.id} />
          )}

          <Button className="w-full" disabled={isSubmitting}>
            {transaction == null ? "Add transaction" : "Edit transaction"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
