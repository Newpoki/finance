"use client"

import { TransactionsFiltersSort } from "./transactions-filters-sort"
import { TransactionsFiltersCategory } from "./transactions-filters-category"
import { TransactionsPageSearchParams } from "../transactions-types"
import {
  ParsedTransactionsSearchParams,
  parseTransactionsSearchParams,
} from "../parse-transactions-search-params"
import { TransactionsFiltersSearch } from "./transactions-filters-search"
import { usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"

type TransactionsFiltersProps = {
  searchParams: TransactionsPageSearchParams
}

export const TransactionsFilters = ({
  searchParams,
}: TransactionsFiltersProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const parsedSearchParams = parseTransactionsSearchParams(searchParams)

  const handleFiltersChange = useCallback(
    (newFilters: Partial<ParsedTransactionsSearchParams>) => {
      const updatedSearchParams = new URLSearchParams({
        ...parsedSearchParams,
        ...newFilters,
      })

      // Don't want an empty search parameter in the url
      if (updatedSearchParams.get("search") === "") {
        updatedSearchParams.delete("search")
      }

      router.push(`${pathname}?${updatedSearchParams.toString()}`)
    },
    [parsedSearchParams, pathname, router],
  )

  return (
    <div className="flex items-center justify-between gap-6">
      <TransactionsFiltersSearch
        parsedSearchParams={parsedSearchParams}
        onFiltersChange={handleFiltersChange}
      />

      <div className="flex items-center gap-6">
        <TransactionsFiltersSort
          parsedSearchParams={parsedSearchParams}
          onFiltersChange={handleFiltersChange}
        />
        <TransactionsFiltersCategory
          parsedSearchParams={parsedSearchParams}
          onFiltersChange={handleFiltersChange}
        />
      </div>
    </div>
  )
}
