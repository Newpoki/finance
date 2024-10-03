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
import Sort from "@/icons/sort.svg"
import { Fragment, useCallback, useMemo } from "react"
import { TRANSACTIONS_SORT_OPTIONS } from "../transactions-constants"
import { ParsedTransactionsSearchParams } from "../parse-transactions-search-params"

type TransactionsFiltersSortProps = {
  parsedSearchParams: ParsedTransactionsSearchParams
  onFiltersChange: (newFilters: Partial<ParsedTransactionsSearchParams>) => void
}

export const TransactionsFiltersSort = ({
  parsedSearchParams,
  onFiltersChange,
}: TransactionsFiltersSortProps) => {
  const selectedOption = useMemo(() => {
    return TRANSACTIONS_SORT_OPTIONS.find(
      (option) =>
        option.config.column === parsedSearchParams.column &&
        option.config.direction === parsedSearchParams.direction,
    )
  }, [parsedSearchParams.column, parsedSearchParams.direction])

  const handleChangeSort = useCallback(
    (id: string) => {
      const option = TRANSACTIONS_SORT_OPTIONS.find(
        (option) => option.id === id,
      )

      if (option == null) {
        throw new Error(`No option was found with the id ${id}`)
      }

      onFiltersChange({
        column: option.config.column,
        direction: option.config.direction,
      })
    },
    [onFiltersChange],
  )

  if (selectedOption == null) {
    throw new Error(
      `No option found with ${parsedSearchParams.column} and ${parsedSearchParams.direction}`,
    )
  }

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex md:hidden">
          <Sort />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={24}>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup
            value={selectedOption.id}
            onValueChange={handleChangeSort}
          >
            {TRANSACTIONS_SORT_OPTIONS.map((option) => (
              <Fragment key={option.id}>
                <DropdownMenuRadioItem value={option.id}>
                  {option.label}
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator className="last:hidden" />
              </Fragment>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <p className="hidden text-grey-500 md:flex">Sort by</p>

      <Select onValueChange={handleChangeSort} value={selectedOption.id}>
        <SelectTrigger className="hidden w-[115px] md:flex">
          <SelectValue placeholder="Latest">{selectedOption.label}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {TRANSACTIONS_SORT_OPTIONS.map((option) => (
            <Fragment key={option.id}>
              <SelectItem value={option.id}>{option.label}</SelectItem>
              <SelectSeparator className="last:hidden" />
            </Fragment>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
