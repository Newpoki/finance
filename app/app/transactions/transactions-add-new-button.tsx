import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

type TransactionsAddNewButtonProps = {
  disabled?: boolean
}

export const TransactionsAddNewButton = ({
  disabled = false,
}: TransactionsAddNewButtonProps) => {
  return (
    <Link href="/app/transactions/new">
      <Button
        className="flex md:hidden"
        size="icon"
        variant="ghost"
        disabled={disabled}
      >
        <PlusIcon />
      </Button>
      <Button className="hidden gap-2 md:flex" disabled={disabled}>
        <PlusIcon />
        <span>Add New Transaction</span>
      </Button>
    </Link>
  )
}
