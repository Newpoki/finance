"use client"

import { FieldPath, useForm } from "react-hook-form"
import {
  Transaction,
  TransactionFormValues,
  transactionFormValuesSchema,
} from "../transaction-types"
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_CATEGORIES_OPTIONS,
} from "../transaction-constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Fragment, useCallback, useTransition } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { FormMessage } from "@/components/form-message"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

type TransactionFormProps = {
  transaction?: Transaction
  profile: Profile
}

export const TransactionForm = ({
  transaction,
  profile,
}: TransactionFormProps) => {
  const router = useRouter()

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormValuesSchema),
    defaultValues: {
      amount:
        transaction?.amount_cents != null
          ? transaction.amount_cents / 100
          : null,
      category: transaction?.category ?? TRANSACTION_CATEGORIES.GENERAL,
      date: transaction?.date != null ? new Date(transaction.date) : new Date(),
      id: transaction?.id ?? null,
      name: transaction?.name ?? "",
      isExpense: transaction?.amount_cents
        ? transaction.amount_cents < 0
        : true,
    },
  })

  const [isSubmitting, startTransition] = useTransition()

  const onSubmit = useCallback(
    (formValues: TransactionFormValues) => {
      startTransition(async () => {
        const response = await upsertTransactionAction({
          ...formValues,
          amount:
            formValues.amount != null
              ? formatToCents(
                  formValues.isExpense
                    ? -formValues.amount
                    : Math.abs(formValues.amount),
                )
              : null,
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
            mode="single"
          />

          <FormField
            control={form.control}
            disabled={isSubmitting}
            name="category"
            render={({ field, fieldState }) => {
              const selectedOption = TRANSACTION_CATEGORIES_OPTIONS.find(
                (option) => option.value === field.value,
              )

              if (selectedOption == null) {
                throw new Error("Selected transaction option not found")
              }

              return (
                <FormItem>
                  <FormLabel>Budget Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a transaction category">
                          {selectedOption.label}
                        </SelectValue>
                      </SelectTrigger>

                      <SelectContent sideOffset={8}>
                        {TRANSACTION_CATEGORIES_OPTIONS.map((option) => (
                          <Fragment key={option.value}>
                            <SelectItem value={option.value}>
                              {option.label}
                            </SelectItem>
                            <SelectSeparator className="last:hidden" />
                          </Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {fieldState.error?.message && (
                    <FormMessage
                      type="error"
                      content={fieldState.error.message}
                    />
                  )}
                </FormItem>
              )
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {transaction != null && (
            <TransactionDeleteAlertDialog transactionId={transaction.id} />
          )}

          <Button className="w-full">
            {transaction == null ? "Add transaction" : "Edit transaction"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
