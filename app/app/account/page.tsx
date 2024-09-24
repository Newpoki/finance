import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { AccountProfile } from "./profile/account-profile"
import { signOutAction } from "@/app/(auth-pages)/sign-out/sign-out-actions"

// TODO: Create loading and error pages
export default function AccountPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Account</h1>

        {/* TODO: Create a route /sign-out that display a See you soon message, then trigger the signout */}
        <form>
          <Button
            formAction={signOutAction}
            className="flex md:hidden"
            size="icon"
            variant="ghost"
          >
            <LogOutIcon />
          </Button>

          <Button formAction={signOutAction} className="hidden gap-2 md:flex">
            <LogOutIcon />
            <span>Sign Out</span>
          </Button>
        </form>
      </div>

      <AccountProfile />
    </div>
  )
}
