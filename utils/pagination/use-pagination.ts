type UsePaginationParams = {
  currentPage: number
  totalPagesCount: number
  visibleItems?: number
}

type PageId =
  | number
  | "previous-button"
  | "previous-ellipsis"
  | "next-button"
  | "next-ellipsis"

type PageButton = {
  type: "NUMBER_PAGE"
  value: number
  id: PageId
  label: `${number}`
}

type PageEllipsis = {
  type: "ELLIPSIS"
  direction: "previous" | "next"
  id: PageId
}

type PagePrevious = {
  type: "PREVIOUS_PAGE"
  id: PageId
}
type PageNext = {
  type: "NEXT_PAGE"
  id: PageId
}

export type Page = PageButton | PageEllipsis | PagePrevious | PageNext

export const usePagination = ({
  currentPage,
  totalPagesCount,
  visibleItems = 7,
}: UsePaginationParams): Page[] => {
  let pages: Page[] = []

  // Helper function to add page numbers
  const addPageNumbers = (start: number, end: number) => {
    for (let i = start; i <= end && pages.length < visibleItems; i++) {
      pages.push({ type: "NUMBER_PAGE", value: i, id: i, label: `${i + 1}` })
    }
  }

  // Always add first page
  pages.push({ type: "NUMBER_PAGE", value: 0, id: 0, label: "1" })

  if (totalPagesCount <= visibleItems) {
    // If we have space for all pages, add them all
    addPageNumbers(1, totalPagesCount)
  } else {
    if (currentPage <= 3) {
      // Near the start
      addPageNumbers(1, 3)
      pages.push({
        type: "ELLIPSIS",
        direction: "previous",
        id: "previous-ellipsis",
      })
      pages.push({
        type: "NUMBER_PAGE",
        value: totalPagesCount,
        id: totalPagesCount,
        label: `${totalPagesCount}`,
      })
    } else if (currentPage >= totalPagesCount - 4) {
      // Near the end
      pages = [{ type: "PREVIOUS_PAGE", id: "previous-button" }, ...pages]
      pages.push({ type: "ELLIPSIS", direction: "next", id: "next-ellipsis" })
      addPageNumbers(totalPagesCount - 4, totalPagesCount)
    } else {
      // In the middle
      pages = [{ type: "PREVIOUS_PAGE", id: "previous-button" }, ...pages]
      pages.push({
        type: "ELLIPSIS",
        direction: "previous",
        id: "previous-ellipsis",
      })
      pages.push({
        type: "NUMBER_PAGE",
        value: currentPage,
        id: currentPage,
        label: `${currentPage + 1}`,
      })
      pages.push({ type: "ELLIPSIS", direction: "next", id: "next-ellipsis" })
      pages.push({
        type: "NUMBER_PAGE",
        value: totalPagesCount,
        id: totalPagesCount,
        label: `${totalPagesCount}`,
      })
    }

    // Add 'next' button if not on last page and we have space
    if (currentPage < totalPagesCount && pages.length < visibleItems) {
      pages.push({ type: "NEXT_PAGE", id: "next-button" })
    }
  }

  return pages
}
