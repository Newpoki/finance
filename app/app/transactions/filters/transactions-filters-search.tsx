"use client"

import { Input } from "@/components/ui/input"
import MagnifyingGlass from "@/icons/magnifying-glass.svg"
import { useCallback, useEffect, useMemo } from "react"
import debounce from "lodash.debounce"
import { ParsedTransactionsSearchParams } from "../parse-transactions-search-params"

type TransactionsFiltersSearchProps = {
  parsedSearchParams: ParsedTransactionsSearchParams
  onFiltersChange: (newFilters: Partial<ParsedTransactionsSearchParams>) => void
}

export const TransactionsFiltersSearch = ({
  parsedSearchParams,
  onFiltersChange,
}: TransactionsFiltersSearchProps) => {
  const debouncedOnChange = useMemo(
    () =>
      debounce((value: string) => {
        onFiltersChange({ search: value })
      }, 350),
    [onFiltersChange],
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      debouncedOnChange(event.target.value)
    },
    [debouncedOnChange],
  )

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel()
    }
  }, [debouncedOnChange])

  return (
    <Input
      defaultValue={parsedSearchParams.search}
      placeholder="Search transaction"
      endAdornment={<MagnifyingGlass />}
      className="max-w-[320px]"
      onChange={handleChange}
    />
  )
}
