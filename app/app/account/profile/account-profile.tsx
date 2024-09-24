import { Paper } from "@/components/ui/paper"
import { AccountProfileForm } from "./account-profile-form"
import { fetchCurrentUserProfile } from "./fetch-current-user-profile"

export const AccountProfile = async () => {
  const currentUserProfile = await fetchCurrentUserProfile()

  return (
    <Paper className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2>Profile</h2>
      </div>

      <p className="text-grey-500">
        Tell us more about you. We&apos;ll call you by your first name.
      </p>
      <AccountProfileForm profile={currentUserProfile} />
    </Paper>
  )
}
