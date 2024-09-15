"use server"

type GetTotalPaginationPagesParamas = {
  count: number
  itemPerPage: number
}
export const getTotalPaginationPages = async ({
  count,
  itemPerPage,
}: GetTotalPaginationPagesParamas) => {
  const totalPages = Math.floor(count / itemPerPage)

  return totalPages
}
