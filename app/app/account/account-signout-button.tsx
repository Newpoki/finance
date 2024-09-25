import { signOutAction } from "@/app/(auth-pages)/sign-out/sign-out-actions"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"

type AccountSignoutButtonProps = {
  disabled?: boolean
}
export const AccountSignoutButton = ({
  disabled = false,
}: AccountSignoutButtonProps) => {
  return (
    /* TODO: Create a route /sign-out that display a See you soon message, then trigger the signout */
    <form>
      <Button
        formAction={signOutAction}
        disabled={disabled}
        className="flex md:hidden"
        size="icon"
        variant="ghost"
      >
        <LogOutIcon />
      </Button>

      <Button
        formAction={signOutAction}
        className="hidden gap-2 md:flex"
        disabled={disabled}
      >
        <LogOutIcon />
        <span>Sign Out</span>
      </Button>
    </form>
  )
}
