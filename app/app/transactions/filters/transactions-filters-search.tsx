"use client"

import { Input } from "@/components/ui/input"
import MagnifyingGlass from "@/icons/magnifying-glass.svg"
import { useCallback, useMemo } from "react"
import debounce from "lodash.debounce"
import { ParsedTransactionsSearchParams } from "../parse-transactions-search-params"
import { usePathname, useRouter } from "next/navigation"

type TransactionsFiltersSearchProps = {
  parsedSearchParams: ParsedTransactionsSearchParams
}

export const TransactionsFiltersSearch = ({
  parsedSearchParams,
}: TransactionsFiltersSearchProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const debouncedOnChange = useMemo(
    () =>
      debounce((value: string) => {
        const updatedSearchParams = new URLSearchParams({
          ...parsedSearchParams,
          search: value,
        })

        router.push(`${pathname}?${updatedSearchParams.toString()}`)
      }, 350),
    [parsedSearchParams, pathname, router],
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      debouncedOnChange(event.target.value)
    },
    [debouncedOnChange],
  )

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
