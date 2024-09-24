import { Paper } from "@/components/ui/paper"
import { ProfileAccountDetailsForm } from "./profile-account-details-form"
import { fetchCurrentUserProfile } from "../fetch-current-user-profile"

export const ProfileAccountDetails = async () => {
  const currentUserProfile = await fetchCurrentUserProfile()

  return (
    <Paper className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2>Account details</h2>
      </div>

      <p className="text-grey-500">
        Tell us more about you. We&apos;ll call you by your first name.
      </p>
      <ProfileAccountDetailsForm profile={currentUserProfile} />
    </Paper>
  )
}
