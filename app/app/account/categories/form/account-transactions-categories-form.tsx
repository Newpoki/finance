"use client"

import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldPath, useForm } from "react-hook-form"
import {
  AccountTransactionsCategoriesFormValues,
  accountTransactionsCategoriesFormValuesSchema,
  TransactionCategory,
} from "../account-transactions-categories-types"
import { AccountTransactionsCategoriesColorPicker } from "./account-transactions-categories-form-color-picker"
import { ControlledInput } from "@/components/rhk/controlled-input"
import { ControlledSelect } from "@/components/rhk/controlled-select"
import { Button } from "@/components/ui/button"
import { TRANSACTION_CATEGORIES_ICONS } from "@/app/app/transaction/transaction-constants"
import { TransactionCategoryIcon } from "@/app/app/transaction/transaction-category-icon"
import { useCallback, useMemo, useTransition } from "react"
import { TRANSACTION_CATEGORIES_ICONS_LIST } from "../account-transactions-categories-constants"
import { upsertTransactionCategory } from "./upsert-transaction-category"
import { toast } from "sonner"

type AccountTransactionsCategoriesFormProps = {
  category?: TransactionCategory
  onSuccess: () => void
}

export const AccountTransactionsCategoriesForm = ({
  category,
  onSuccess,
}: AccountTransactionsCategoriesFormProps) => {
  const form = useForm<AccountTransactionsCategoriesFormValues>({
    resolver: zodResolver(accountTransactionsCategoriesFormValuesSchema),
    defaultValues: {
      color: category?.color ?? "#000000",
      icon_name: category?.icon_name ?? TRANSACTION_CATEGORIES_ICONS.USER,
      name: category?.name ?? "",
      id: category?.id ?? null,
    },
  })

  const categoryIconsOptions = useMemo(
    () =>
      TRANSACTION_CATEGORIES_ICONS_LIST.map((icon) => ({
        value: icon,
        // Label will not really be used as we're using a custom renderer for option and value
        label: icon,
      })),
    [],
  )

  const [isSubmitting, startTransition] = useTransition()

  const onSubmit = useCallback(
    (formValues: AccountTransactionsCategoriesFormValues) => {
      startTransition(async () => {
        const response = await upsertTransactionCategory(formValues)

        if (response.type === "success") {
          toast.success(
            category != null
              ? "Transaction category has been edited"
              : "Transaction category has been created",
          )

          onSuccess()

          return
        }

        if (response.type === "generic") {
          form.setError("root", { message: response.message })
          return
        }

        response.fields.forEach((field) => {
          form.setError(
            field.path as FieldPath<AccountTransactionsCategoriesFormValues>,
            {
              message: field.message,
            },
          )
        })
      })
    },
    [category, form, onSuccess],
  )

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <AccountTransactionsCategoriesColorPicker disabled={isSubmitting} />

        <ControlledInput
          name="name"
          control={form.control}
          placeholder="Groceries"
          label="Name"
          disabled={isSubmitting}
        />

        <ControlledSelect
          name="icon_name"
          control={form.control}
          label="Icon"
          options={categoryIconsOptions}
          disabled={isSubmitting}
          hideSeparator
          viewportClassName="grid grid-cols-[repeat(7,1fr)]"
          renderOption={(option) => {
            return <TransactionCategoryIcon name={option.value} />
          }}
          renderValue={(option) => {
            return option != null ? (
              <TransactionCategoryIcon name={option.value} />
            ) : (
              "Please select an icon"
            )
          }}
        />

        <Button className="w-full" disabled={isSubmitting}>
          {category == null
            ? "Add Transaction Category"
            : "Edit Transaction Category"}
        </Button>
      </form>
    </Form>
  )
}
