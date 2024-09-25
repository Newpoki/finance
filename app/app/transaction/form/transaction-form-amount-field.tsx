"use client"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { useFormContext, useWatch } from "react-hook-form"
import { Transaction, TransactionFormValues } from "../transaction-types"
import { NumericFormat } from "react-number-format"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCallback, useMemo } from "react"
import { getCurrencySymbol } from "@/currency/get-currency-symbol"
import { getGroupSeparator } from "@/currency/get-group-separator"
import { getDecimalSeparator } from "@/currency/get-decimal-separator"
import { FormMessage } from "@/components/form-message"
import { Profile } from "../../account/profile/account-profile-types"

type TransactionFormAmountFieldProps = {
  isSubmitting: boolean
  transaction?: Transaction
  profile: Profile
}

export const TransactionFormAmountField = ({
  isSubmitting,
  profile,
  transaction,
}: TransactionFormAmountFieldProps) => {
  const { control, setValue } = useFormContext<TransactionFormValues>()

  const isExpense = useWatch({ control, name: "isExpense" })

  const displayedCurrencySymbol = useMemo(
    () =>
      getCurrencySymbol(
        profile.locale,
        transaction?.currency_code ?? profile.currency_code,
      ),
    [profile.currency_code, profile.locale, transaction?.currency_code],
  )

  const displayedGroupSeparator = useMemo(
    () => getGroupSeparator(profile.locale),
    [profile.locale],
  )

  const displayedDecimalSeparator = useMemo(
    () => getDecimalSeparator(profile.locale),
    [profile.locale],
  )

  const handleToggleIsExpense = useCallback(() => {
    setValue("isExpense", !isExpense, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }, [isExpense, setValue])

  return (
    // TODO: Create controlled field for currency fields
    <FormField
      control={control}
      disabled={isSubmitting}
      name="amount"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <NumericFormat
              startAdornment={
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        type="button"
                        variant="ghost"
                        className="-ml-4"
                        onClick={handleToggleIsExpense}
                      >
                        {isExpense ? <MinusIcon /> : <PlusIcon />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isExpense
                        ? "This will count as an expense"
                        : "This will count as an income"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
              customInput={Input}
              suffix={` ${displayedCurrencySymbol}`}
              placeholder={`20${displayedDecimalSeparator}42 ${displayedCurrencySymbol}`}
              name={field.name}
              thousandSeparator={displayedGroupSeparator}
              decimalSeparator={displayedDecimalSeparator}
              required
              //  We don't allow negative as we're handling it with `isExpense`
              allowNegative={false}
              defaultValue={field.value}
              onValueChange={(values) => {
                field.onChange(values.floatValue)
              }}
              allowLeadingZeros={false}
              disabled={field.disabled}
            />
          </FormControl>
          {fieldState.error?.message && (
            <FormMessage type="error" content={fieldState.error.message} />
          )}
        </FormItem>
      )}
    />
  )
}
