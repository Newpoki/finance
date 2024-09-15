"use server"

type GetTotalPaginationPagesParamas = {
  count: number
  itemPerPage: number
}
export const getTotalPaginationPages = async ({
  count,
  itemPerPage,
}: GetTotalPaginationPagesParamas) => {
  const totalPages = count / itemPerPage
  const flooredTotalPages = Math.floor(count / itemPerPage)

  return totalPages === flooredTotalPages
    ? flooredTotalPages
    : flooredTotalPages + 1
}
