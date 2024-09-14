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
import { usePathname, useRouter } from "next/navigation"
import { TRANSACTIONS_CATEGORY_OPTIONS } from "../transactions-constants"

type TransactionsFiltersCategoryProps = {
  parsedSearchParams: ParsedTransactionsSearchParams
}

export const TransactionsFiltersCategory = ({
  parsedSearchParams,
}: TransactionsFiltersCategoryProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const selectedOption = useMemo(() => {
    return TRANSACTIONS_CATEGORY_OPTIONS.find(
      (option) => option.value === parsedSearchParams.category,
    )
  }, [parsedSearchParams.category])

  const handleChangeCategory = useCallback(
    (value: string) => {
      const option = TRANSACTIONS_CATEGORY_OPTIONS.find(
        (option) => option.value === value,
      )

      if (option == null) {
        throw new Error(`No option was found with the value ${value}`)
      }

      const updatedSearchParams = new URLSearchParams({
        ...parsedSearchParams,
        category: option.value,
      })

      router.push(`${pathname}?${updatedSearchParams.toString()}`)
    },
    [parsedSearchParams, pathname, router],
  )

  if (selectedOption == null) {
    throw new Error(`No option found with ${parsedSearchParams.category}`)
  }

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
            {TRANSACTIONS_CATEGORY_OPTIONS.map((option) => (
              <Fragment key={option.value}>
                <DropdownMenuRadioItem value={option.value}>
                  {option.label}
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
          <SelectValue placeholder="Latest">{selectedOption.label}</SelectValue>
        </SelectTrigger>

        <SelectContent sideOffset={8}>
          {TRANSACTIONS_CATEGORY_OPTIONS.map((option) => (
            <Fragment key={option.value}>
              <SelectItem value={option.value}>{option.label}</SelectItem>
              <SelectSeparator className="last:hidden" />
            </Fragment>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
