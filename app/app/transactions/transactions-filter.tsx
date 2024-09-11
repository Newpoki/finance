import { Input } from "@/components/ui/input"
import MagnifyingGlass from "@/icons/magnifying-glass.svg"
import Filter from "@/icons/filter.svg"
import { TransactionsFiltersSort } from "./filters/transactions-filters-sort"

export const TransactionsFilter = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <Input
        required
        placeholder="Search transaction"
        endAdornment={<MagnifyingGlass />}
      />

      <div className="flex items-center gap-4">
        <TransactionsFiltersSort />
        <Filter />
      </div>
    </div>
  )
}
