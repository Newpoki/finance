import Link from "next/link"
import { Paper } from "@/components/ui/paper"
import { ForgotPasswordForm } from "./forgot-password-form"

export default function ForgotPassword() {
  return (
    <Paper className="flex w-full max-w-[560px] flex-col gap-8 px-5 py-6">
      <h1>Reset password</h1>

      <ForgotPasswordForm />

      <p className="flex gap-2">
        <span className="text-grey-500">Need to create an account?</span>
        <Link href="/sign-up" className="body1 font-bold underline">
          Sign Up
        </Link>
      </p>
    </Paper>
  )
}
