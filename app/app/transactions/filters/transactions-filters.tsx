"use client"

import { TransactionsFiltersSort } from "./transactions-filters-sort"
import { TransactionsFiltersCategory } from "./transactions-filters-category"
import { ParsedTransactionsSearchParams } from "../parse-transactions-search-params"
import { TransactionsFiltersSearch } from "./transactions-filters-search"
import { usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"

type TransactionsFiltersProps = {
  parsedSearchParams: ParsedTransactionsSearchParams
}

export const TransactionsFilters = ({
  parsedSearchParams,
}: TransactionsFiltersProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleFiltersChange = useCallback(
    (newFilters: Partial<ParsedTransactionsSearchParams>) => {
      const updatedSearchParams = new URLSearchParams({
        ...parsedSearchParams,
        ...newFilters,
        page: "0",
      })

      // Don't want an empty search parameter in the url
      if (updatedSearchParams.get("search") === "") {
        updatedSearchParams.delete("search")
      }

      router.refresh()
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
