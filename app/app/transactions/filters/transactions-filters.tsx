import { Input } from "@/components/ui/input"
import MagnifyingGlass from "@/icons/magnifying-glass.svg"
import { TransactionsFiltersSort } from "./transactions-filters-sort"
import { TransactionsFiltersCategory } from "./transactions-filters-category"
import { TransactionsPageSearchParams } from "../transactions-types"
import { parseTransactionsSearchParams } from "../parse-transactions-search-params"

type TransactionsFiltersProps = {
  searchParams: TransactionsPageSearchParams
}

export const TransactionsFilters = ({
  searchParams,
}: TransactionsFiltersProps) => {
  const parsedSearchParams = parseTransactionsSearchParams(searchParams)

  return (
    <div className="flex items-center justify-between gap-6">
      <Input
        required
        placeholder="Search transaction"
        endAdornment={<MagnifyingGlass />}
        className="max-w-[320px]"
      />

      <div className="flex items-center gap-6">
        <TransactionsFiltersSort parsedSearchParams={parsedSearchParams} />
        <TransactionsFiltersCategory />
      </div>
    </div>
  )
}
