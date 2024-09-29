"use client"

import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChromePicker, ColorResult } from "react-color"
import { useController, useFormContext } from "react-hook-form"
import { AccountTransactionsCategoriesFormValues } from "../account-transactions-categories-types"
import { useCallback } from "react"
import { cn } from "@/lib/utils"

type AccountTransactionsCategoriesColorPickerProps = {
  disabled: boolean
}

export const AccountTransactionsCategoriesColorPicker = ({
  disabled,
}: AccountTransactionsCategoriesColorPickerProps) => {
  const { control } = useFormContext<AccountTransactionsCategoriesFormValues>()
  const { field } = useController({ control, name: "color" })

  const handleChange = useCallback(
    (color: ColorResult) => {
      field.onChange(color.hex)
    },
    [field],
  )

  return (
    <FormItem>
      <FormLabel>Color</FormLabel>
      <Popover>
        <FormControl>
          <PopoverTrigger asChild disabled={disabled}>
            <div
              className={cn(
                "flex w-48 cursor-pointer items-center gap-4 rounded-md bg-foreground px-3 py-2",
                { "cursor-default": disabled },
              )}
            >
              <div
                className="h-6 w-6 shrink-0 rounded-md border border-white/35"
                style={{ backgroundColor: field.value }}
              />
              <p className="text-white">{field.value}</p>
            </div>
          </PopoverTrigger>
        </FormControl>
        <PopoverContent className="w-auto p-0" align="start">
          <ChromePicker color={field.value} onChange={handleChange} />
        </PopoverContent>
      </Popover>
    </FormItem>
  )
}
