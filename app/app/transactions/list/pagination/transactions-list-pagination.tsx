"use client"

import { Pagination, PaginationContent } from "@/components/ui/pagination"
import { usePagination } from "@/utils/pagination/use-pagination"
import { useCallback } from "react"
import { TransactionsListPaginationItem } from "./transactions-list-pagination-item"
import { ParsedTransactionsSearchParams } from "../../parse-transactions-search-params"
import { usePathname, useRouter } from "next/navigation"

type TransactionsListPaginationProps = {
  parsedSearchParams: ParsedTransactionsSearchParams
  totalPages: number
}

export const TransactionsListPagination = ({
  parsedSearchParams,
  totalPages,
}: TransactionsListPaginationProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const currentPageNumber = parsedSearchParams.page

  const pages = usePagination({
    currentPage: currentPageNumber,
    totalPagesCount: totalPages,
  })

  const handleClick = useCallback(
    (targetPage: number) => {
      const updatedSearchParams = new URLSearchParams({
        ...parsedSearchParams,
        page: `${targetPage}`,
      })

      router.push(`${pathname}?${updatedSearchParams.toString()}`)
    },
    [parsedSearchParams, pathname, router],
  )

  return (
    <Pagination className="mt-auto">
      <PaginationContent className="relative w-full items-center justify-center">
        {pages.map((page) => (
          <TransactionsListPaginationItem
            key={page.id}
            page={page}
            onClick={handleClick}
            currentPageNumber={currentPageNumber}
          />
        ))}
      </PaginationContent>
    </Pagination>
  )
}
