import { TransactionsFiltersSort } from "./transactions-filters-sort"
import { TransactionsFiltersCategory } from "./transactions-filters-category"
import { TransactionsPageSearchParams } from "../transactions-types"
import { parseTransactionsSearchParams } from "../parse-transactions-search-params"
import { TransactionsFiltersSearch } from "./transactions-filters-search"

type TransactionsFiltersProps = {
  searchParams: TransactionsPageSearchParams
}

export const TransactionsFilters = ({
  searchParams,
}: TransactionsFiltersProps) => {
  const parsedSearchParams = parseTransactionsSearchParams(searchParams)

  return (
    <div className="flex items-center justify-between gap-6">
      <TransactionsFiltersSearch parsedSearchParams={parsedSearchParams} />

      <div className="flex items-center gap-6">
        <TransactionsFiltersSort parsedSearchParams={parsedSearchParams} />
        <TransactionsFiltersCategory parsedSearchParams={parsedSearchParams} />
      </div>
    </div>
  )
}
