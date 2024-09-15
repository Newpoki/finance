type UsePaginationParams = {
  currentPage: number
  totalPagesCount: number
  visibleItems?: number
}

type PageButton = {
  type: "NUMBER_PAGE"
  value: number
}

type PageEllipsis = {
  type: "ELLIPSIS"
  direction: "previous" | "next"
}

type PagePrevious = {
  type: "PREVIOUS_PAGE"
}
type PageNext = {
  type: "NEXT_PAGE"
}

type Page = PageButton | PageEllipsis | PagePrevious | PageNext

export const usePagination = ({
  currentPage,
  totalPagesCount,
  visibleItems = 7,
}: UsePaginationParams): Page[] => {
  let pages: Page[] = []

  // Helper function to add page numbers
  const addPageNumbers = (start: number, end: number) => {
    for (let i = start; i <= end && pages.length < visibleItems; i++) {
      pages.push({ type: "NUMBER_PAGE", value: i })
    }
  }

  // Always add first page
  pages.push({ type: "NUMBER_PAGE", value: 1 })

  if (totalPagesCount <= visibleItems) {
    // If we have space for all pages, add them all
    addPageNumbers(2, totalPagesCount)
  } else {
    if (currentPage <= 4) {
      // Near the start
      addPageNumbers(2, 4)
      pages.push({ type: "ELLIPSIS", direction: "previous" })
      pages.push({ type: "NUMBER_PAGE", value: totalPagesCount })
    } else if (currentPage >= totalPagesCount - 3) {
      // Near the end
      pages = [{ type: "PREVIOUS_PAGE" }, ...pages]
      pages.push({ type: "ELLIPSIS", direction: "next" })
      addPageNumbers(totalPagesCount - 3, totalPagesCount)
    } else {
      // In the middle
      pages = [{ type: "PREVIOUS_PAGE" }, ...pages]
      pages.push({ type: "ELLIPSIS", direction: "previous" })
      pages.push({ type: "NUMBER_PAGE", value: currentPage })
      pages.push({ type: "ELLIPSIS", direction: "next" })
      pages.push({ type: "NUMBER_PAGE", value: totalPagesCount })
    }
  }

  // Add 'next' button if not on last page and we have space
  if (currentPage < totalPagesCount && pages.length < visibleItems) {
    pages.push({ type: "NEXT_PAGE" })
  }

  return pages
}
