"use server"

type GetSupabasePaginationRangeParams = {
  pageNumber: number
  itemPerPage: number
  count: number
}

export const getPaginationRange = async ({
  pageNumber,
  itemPerPage,
  count,
}: GetSupabasePaginationRangeParams) => {
  const rangeFrom = pageNumber * itemPerPage
  // Removing 1 as range index starts from 0
  const rangeTo = rangeFrom + itemPerPage - 1

  return {
    rangeFrom,
    // Supabase doesn't really like when the rangeTo exceed the max number elements
    rangeTo: rangeTo > count ? count - 1 : rangeTo,
  }
}
