import { AccountProfile } from "./profile/account-profile"
import { AccountSignoutButton } from "./account-signout-button"
import { AccountCredentials } from "./credentials/account-credentials"
import { fetchCurrentUserProfile } from "./profile/fetch-current-user-profile"

// TODO: error pages
export default async function AccountPage() {
  const currentUserProfile = await fetchCurrentUserProfile()

  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Account</h1>
        <AccountSignoutButton />
      </div>

      <div className="flex w-full flex-col gap-8 xl:grid xl:grid-cols-[2fr_1fr]">
        <AccountProfile profile={currentUserProfile} />

        <AccountCredentials profile={currentUserProfile} />
      </div>
    </div>
  )
}
