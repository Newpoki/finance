"use client"

import { TransactionsFiltersSort } from "./transactions-filters-sort"
import { TransactionsFiltersCategory } from "./transactions-filters-category"
import { ParsedTransactionsSearchParams } from "../parse-transactions-search-params"
import { TransactionsFiltersSearch } from "./transactions-filters-search"
import { usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"
import { TransactionCategory } from "../../account/categories/account-transactions-categories-types"
import { TransactionsFiltersPeriod } from "./transactions-filters-period"
import { Profile } from "../../account/profile/account-profile-types"

type TransactionsFiltersProps = {
  parsedSearchParams: ParsedTransactionsSearchParams
  transactionCategories: TransactionCategory[]
  profile: Profile
}

export const TransactionsFilters = ({
  parsedSearchParams,
  transactionCategories,
  profile,
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
    <div className="flex flex-col gap-4">
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
            transactionCategories={transactionCategories}
          />
        </div>
      </div>

      <TransactionsFiltersPeriod
        parsedSearchParams={parsedSearchParams}
        locale={profile.locale}
        timezone={profile.timezone}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  )
}
