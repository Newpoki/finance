"use client"

import { FieldPath, useForm } from "react-hook-form"
import {
  Transaction,
  TransactionFormValues,
  transactionFormValuesSchema,
} from "./transaction-types"
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_CATEGORIES_OPTIONS,
} from "./transaction-constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Fragment, useCallback, useMemo, useTransition } from "react"
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
import { Profile } from "../profile/profile-types"
import { getCurrencySymbol } from "@/currency/get-currency-symbol"
import { NumericFormat } from "react-number-format"
import { upsertTransactionAction } from "./transaction-actions"
import { toast } from "sonner"

type TransactionFormProps = {
  transaction?: Transaction
  profile: Profile
}

export const TransactionForm = ({
  transaction,
  profile,
}: TransactionFormProps) => {
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
    },
  })

  const [isSubmitting, startTransition] = useTransition()

  const displayedCurrencySymbol = useMemo(() => {
    return getCurrencySymbol(
      profile.locale,
      transaction?.currency_code ?? profile.currency_code,
    )
  }, [profile.currency_code, profile.locale, transaction?.currency_code])

  const onSubmit = useCallback(
    (formValues: TransactionFormValues) => {
      startTransition(async () => {
        const response = await upsertTransactionAction({
          ...formValues,
          // TODO: Add check in schema for value not being null
          amount: Math.trunc(formValues.amount ?? 0) * 100,
        })

        if (response.type === "success") {
          toast.success(
            transaction != null
              ? "Transaction has been edited"
              : "Transaction has been created",
          )

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
    [form, transaction],
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
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
                      className={cn("h-11 w-[280px] text-left font-normal")}
                      disabled={field.disabled}
                    >
                      {formatDate({ date: field.value, locale: "fr-FR" })}
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
          name="amount"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <NumericFormat
                  customInput={Input}
                  suffix={` ${displayedCurrencySymbol}`}
                  placeholder={`20.42 ${displayedCurrencySymbol}`}
                  name={field.name}
                  thousandSeparator
                  required
                  defaultValue={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue)
                  }}
                  disabled={field.disabled}
                />
              </FormControl>
              {fieldState.error?.message && (
                <FormMessage message={{ error: fieldState.error.message }} />
              )}
            </FormItem>
          )}
        />

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
                    <SelectTrigger className="hidden w-full md:flex">
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
                  <FormMessage message={{ error: fieldState.error.message }} />
                )}
              </FormItem>
            )
          }}
        />

        <div className="flex flex-col gap-2">
          {transaction != null && (
            <Button variant="error" type="button">
              Delete transaction
            </Button>
          )}

          <Button>
            {transaction == null ? "Add transaction" : "Edit transaction"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
