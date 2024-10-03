"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Filter from "@/icons/filter.svg"
import { Fragment, useCallback, useMemo } from "react"
import { ParsedTransactionsSearchParams } from "../parse-transactions-search-params"
import { TransactionCategory } from "../../account/categories/account-transactions-categories-types"
import { TransactionCategoryIcon } from "../../transaction/transaction-category-icon"
import { TRANSACTIONS_FILTERS_CATEGORIES_ALL_OPTION } from "../transactions-constants"

type TransactionsFiltersCategoryProps = {
  parsedSearchParams: ParsedTransactionsSearchParams
  onFiltersChange: (newFilters: Partial<ParsedTransactionsSearchParams>) => void
  transactionCategories: TransactionCategory[]
}

export const TransactionsFiltersCategory = ({
  parsedSearchParams,
  onFiltersChange,
  transactionCategories,
}: TransactionsFiltersCategoryProps) => {
  const options = useMemo(() => {
    const allOption = TRANSACTIONS_FILTERS_CATEGORIES_ALL_OPTION

    const transactionCategoriesOption = transactionCategories.map(
      (category) => ({
        value: category.id,
        label: category.name,
        icon_name: category.icon_name,
        color: category.color,
      }),
    )

    return [allOption, ...transactionCategoriesOption]
  }, [transactionCategories])

  const selectedOption = useMemo(() => {
    const transaction = options.find(
      (option) => option.value === parsedSearchParams.category,
    )

    if (transaction == null) {
      throw new Error(
        `No transaction category found with id ${parsedSearchParams.category}`,
      )
    }

    return transaction
  }, [parsedSearchParams.category, options])

  const handleChangeCategory = useCallback(
    (value: string) => {
      const option = options.find((option) => option.value === value)

      if (option == null) {
        throw new Error(`No option was found with the id ${value}`)
      }

      onFiltersChange({ category: option.value })
    },
    [onFiltersChange, options],
  )

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex md:hidden">
          <Filter />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={24}>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup
            value={selectedOption.value}
            onValueChange={handleChangeCategory}
          >
            {options.map((option) => (
              <Fragment key={option.value}>
                <DropdownMenuRadioItem value={option.value}>
                  <div className="flex max-w-52 items-center gap-2 overflow-hidden">
                    {option.icon_name != null && (
                      <TransactionCategoryIcon name={option.icon_name} />
                    )}
                    <span className="truncate">{option.label}</span>
                  </div>
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator className="last:hidden" />
              </Fragment>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <p className="hidden text-grey-500 md:flex">Category</p>

      <Select onValueChange={handleChangeCategory} value={selectedOption.value}>
        <SelectTrigger className="hidden w-[180px] md:flex">
          <SelectValue placeholder="Latest">
            <div className="flex items-center gap-2">
              {selectedOption.icon_name != null && (
                <TransactionCategoryIcon name={selectedOption.icon_name} />
              )}
              <span className="truncate">{selectedOption.label}</span>
            </div>
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="max-w-80">
          {options.map((option) => (
            <Fragment key={option.value}>
              <SelectItem value={option.value}>
                <div className="flex items-center gap-2">
                  {option.icon_name != null && (
                    <TransactionCategoryIcon name={option.icon_name} />
                  )}
                  <span className="truncate">{option.label}</span>
                </div>
              </SelectItem>
              <SelectSeparator className="last:hidden" />
            </Fragment>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
