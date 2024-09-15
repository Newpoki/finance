import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Page } from "@/utils/pagination/use-pagination"
import { useCallback } from "react"

type TransactionsListPaginationItemProps = {
  currentPageNumber: number
  page: Page
  onClick: (page: number) => void
}

export const TransactionsListPaginationItem = ({
  currentPageNumber,
  page,
  onClick,
}: TransactionsListPaginationItemProps) => {
  const handleClick = useCallback(() => {
    switch (page.type) {
      // We do nothing for ellipsis as it's not supposed to happen
      case "ELLIPSIS":
        return
      case "NEXT_PAGE":
        onClick(currentPageNumber + 1)
        return
      case "PREVIOUS_PAGE":
        onClick(currentPageNumber - 1)
        return
      case "NUMBER_PAGE":
        onClick(page.value)
        return
    }
  }, [currentPageNumber, onClick, page])

  switch (page.type) {
    case "PREVIOUS_PAGE": {
      return (
        <PaginationItem onClick={handleClick}>
          <PaginationPrevious />
        </PaginationItem>
      )
    }

    case "NEXT_PAGE": {
      return (
        <PaginationItem>
          <PaginationNext onClick={handleClick} />
        </PaginationItem>
      )
    }

    case "ELLIPSIS": {
      return (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    case "NUMBER_PAGE": {
      return (
        <PaginationItem>
          <PaginationLink
            size="icon"
            isActive={page.value === currentPageNumber}
            onClick={handleClick}
          >
            {page.label}
          </PaginationLink>
        </PaginationItem>
      )
    }
  }
}
