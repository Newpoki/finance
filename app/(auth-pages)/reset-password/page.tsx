import { Paper } from "@/components/ui/paper"
import { ResetPasswordForm } from "./reset-password-form"

export default async function ResetPassword() {
  return (
    // <form className="flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4">
    //   <h1 className="text-2xl font-medium">Reset password</h1>
    //   <p className="text-sm text-foreground/60">
    //     Please enter your new password below.
    //   </p>
    //   <Label htmlFor="password">New password</Label>
    //   <Input
    //     type="password"
    //     name="password"
    //     placeholder="New password"
    //     required
    //   />
    //   <Label htmlFor="confirmPassword">Confirm password</Label>
    //   <Input
    //     type="password"
    //     name="confirmPassword"
    //     placeholder="Confirm password"
    //     required
    //   />
    //   <SubmitButton formAction={resetPasswordAction}>
    //     Reset password
    //   </SubmitButton>
    //   <FormMessage message={searchParams} />
    // </form>
    <Paper className="flex w-full max-w-[560px] flex-col gap-8 px-5 py-6">
      <h1>Reset password</h1>

      <p className="text-grey-500">Please enter your new password below.</p>

      <ResetPasswordForm />
    </Paper>
  )
}
