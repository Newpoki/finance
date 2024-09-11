import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Sort from "@/icons/sort.svg"

export const TransactionsFiltersSort = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Sort />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={24}>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Latest</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Oldest</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>A to Z</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Z to A</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Highest</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Lowest</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
