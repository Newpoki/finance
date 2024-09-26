import { Paper } from "@/components/ui/paper"
import { AccountProfileForm } from "./account-profile-form"
import { Profile } from "./account-profile-types"

type AccountProfileProps = {
  profile: Profile
}

export const AccountProfile = ({ profile }: AccountProfileProps) => {
  return (
    <Paper className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2>Profile</h2>
      </div>

      <p className="text-grey-500">
        Tell us more about you. We&apos;ll call you by your first name.
      </p>
      <AccountProfileForm profile={profile} />
    </Paper>
  )
}
