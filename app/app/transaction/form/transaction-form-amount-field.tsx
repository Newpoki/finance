"use client"

import { useController, useFormContext } from "react-hook-form"
import { Transaction, TransactionFormValues } from "../transaction-types"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { Profile } from "../../account/profile/account-profile-types"
import { ControlledMoneyInput } from "@/components/rhk/controlled-money-input"

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
  const { control } = useFormContext<TransactionFormValues>()
  const { field: isExpenseField } = useController({
    name: "isExpense",
    control,
  })

  const handleToggleIsExpense = useCallback(() => {
    isExpenseField.onChange(!isExpenseField.value)
  }, [isExpenseField])

  return (
    <ControlledMoneyInput
      locale={profile.locale}
      currencyCode={transaction?.currency_code ?? profile.currency_code}
      control={control}
      name="amount"
      label="Amount"
      disabled={isSubmitting}
      //  We don't allow negative as we're handling it with `isExpense`
      allowNegative={false}
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
                {isExpenseField.value ? <MinusIcon /> : <PlusIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isExpenseField.value
                ? "This will count as an expense"
                : "This will count as an income"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    />
  )
}
