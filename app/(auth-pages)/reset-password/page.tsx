import { Paper } from "@/components/ui/paper"
import { ResetPasswordForm } from "./reset-password-form"
import { checkUserNotLoggedOrRedirect } from "@/utils/check-user-not-logged-or-redirect"

export default async function ResetPassword() {
  await checkUserNotLoggedOrRedirect()

  return (
    <Paper className="flex w-full max-w-[560px] flex-col gap-8 px-5 py-6">
      <h1>Reset password</h1>

      <p className="text-grey-500">Please enter your new password below.</p>

      <ResetPasswordForm />
    </Paper>
  )
}
