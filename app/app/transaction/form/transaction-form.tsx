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
import { Input } from "@/components/ui/input"
import { FormMessage } from "@/components/form-message"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { formatDate } from "@/date/format-date"
import { upsertTransactionAction } from "../transaction-actions"
import { toast } from "sonner"
import { TransactionDeleteAlertDialog } from "../transaction-delete-alert-dialog"
import { useRouter } from "next/navigation"
import { formatToCents } from "@/currency/format-to-cents"
import { TransactionFormAmountField } from "./transaction-form-amount-field"
import { Profile } from "../../account/profile/account-profile-types"

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
          <FormField
            control={form.control}
            disabled={isSubmitting}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Carrefour" required />
                </FormControl>
                {fieldState.error?.message && (
                  <FormMessage message={{ error: fieldState.error.message }} />
                )}
              </FormItem>
            )}
          />
          <TransactionFormAmountField
            isSubmitting={isSubmitting}
            profile={profile}
            transaction={transaction}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr]">
          <FormField
            control={form.control}
            name="date"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="w-fit">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outlined"
                        className={cn("h-11 w-full text-left font-normal")}
                        disabled={field.disabled}
                      >
                        {formatDate({
                          date: field.value,
                          locale: profile.locale,
                          timeZone: profile.timezone,
                        })}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
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
                      message={{ error: fieldState.error.message }}
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
