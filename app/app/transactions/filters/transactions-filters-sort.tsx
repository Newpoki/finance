import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Sort from "@/icons/sort.svg"
import { Fragment } from "react"

const options = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
] as const

export const TransactionsFiltersSort = () => {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex md:hidden">
          <Sort />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={24}>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {options.map((option) => (
            <Fragment key={option}>
              <DropdownMenuItem>{option}</DropdownMenuItem>
              <DropdownMenuSeparator className="last:hidden" />
            </Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <p className="hidden text-grey-500 md:flex">Sort by</p>

      <Select>
        <SelectTrigger className="hidden w-[115px] md:flex">
          <SelectValue placeholder="Latest" />
        </SelectTrigger>

        <SelectContent sideOffset={8}>
          {options.map((option) => (
            <Fragment key={option}>
              <SelectItem value={option}>{option}</SelectItem>
              <SelectSeparator className="last:hidden" />
            </Fragment>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
