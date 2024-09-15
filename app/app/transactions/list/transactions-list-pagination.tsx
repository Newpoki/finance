import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePagination } from "@/utils/use-pagination"

export const TransactionsListPagination = () => {
  const currentPage = 5
  const pages = usePagination({
    currentPage,
    totalPagesCount: 20,
  })

  return (
    <Pagination className="mt-auto">
      <PaginationContent>
        {pages.map((page) => {
          switch (page.type) {
            case "PREVIOUS_PAGE": {
              return (
                // Safe to use type as key as there is only one page_previous
                <PaginationItem key={page.type}>
                  <PaginationPrevious href="#" />
                </PaginationItem>
              )
            }

            case "NEXT_PAGE": {
              return (
                // Safe to use type as key as there is only one page_previous
                <PaginationItem key={page.type}>
                  <PaginationNext href="#" />
                </PaginationItem>
              )
            }

            case "ELLIPSIS": {
              return (
                <PaginationItem key={page.direction}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            case "NUMBER_PAGE": {
              return (
                <PaginationItem key={page.value}>
                  <PaginationLink
                    href="#"
                    size="icon"
                    isActive={page.value === currentPage}
                  >
                    {page.value}
                  </PaginationLink>
                </PaginationItem>
              )
            }
          }
        })}
      </PaginationContent>
    </Pagination>
  )
}
