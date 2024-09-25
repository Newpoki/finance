import { AccountProfile } from "./profile/account-profile"
import { AccountSignoutButton } from "./account-signout-button"

// TODO: error pages
export default function AccountPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Account</h1>
        <AccountSignoutButton />
      </div>

      <AccountProfile />
    </div>
  )
}
