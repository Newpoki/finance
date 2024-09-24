import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import Link from "next/link"
import { AccountProfile } from "./profile/account-profile"

export default function AccountPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Account</h1>

        {/* TODO: Remove Sign Out from home page and wire it here */}
        <Link href="/app/transactions/new">
          <Button className="flex md:hidden" size="icon" variant="ghost">
            <LogOutIcon />
          </Button>
          <Button className="hidden gap-2 md:flex">
            <LogOutIcon />
            <span>Sign Out</span>
          </Button>
        </Link>
      </div>

      <AccountProfile />
    </div>
  )
}
