import { Input } from "@/components/ui/input"
import MagnifyingGlass from "@/icons/magnifying-glass.svg"
import { TransactionsFiltersSort } from "./transactions-filters-sort"
import { TransactionsFiltersCategory } from "./transactions-filters-category"

export const TransactionsFilters = () => {
  return (
    <div className="flex items-center justify-between gap-6">
      <Input
        required
        placeholder="Search transaction"
        endAdornment={<MagnifyingGlass />}
        className="max-w-[320px]"
      />

      <div className="flex items-center gap-6">
        <TransactionsFiltersSort />
        <TransactionsFiltersCategory />
      </div>
    </div>
  )
}
