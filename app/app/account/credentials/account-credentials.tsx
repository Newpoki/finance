import { Paper } from "@/components/ui/paper"
import { Profile } from "../profile/account-profile-types"
import { AccountCredentialsForm } from "./account-credentials-form"
import { AccountCredentialsComingSoonAlert } from "./account-credentials-coming-soon-alert"

type AccountCredentialsProps = {
  profile: Profile
}

export const AccountCredentials = ({ profile }: AccountCredentialsProps) => {
  return (
    <Paper className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2>Credentials</h2>
      </div>

      <AccountCredentialsComingSoonAlert />

      <AccountCredentialsForm profile={profile} />
    </Paper>
  )
}
