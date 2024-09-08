import { Paper } from "@/components/ui/paper"
import Link from "next/link"
import { SigninForm } from "./sign-in-form"
import { checkUserNotLoggedOrRedirect } from "@/utils/check-user-not-logged-or-redirect"

export default async function Login() {
  await checkUserNotLoggedOrRedirect()

  return (
    <Paper className="flex w-full max-w-[560px] flex-col gap-8 px-5 py-6">
      <h1>Login</h1>

      <SigninForm />

      <div className="flex flex-col items-center gap-1">
        <p className="flex gap-2">
          <span className="text-grey-500">Need to create an account?</span>
          <Link href="/sign-up" className="body1 font-bold underline">
            Sign Up
          </Link>
        </p>

        <Link href="/forgot-password" className="body1 font-bold underline">
          Forgot your password ?
        </Link>
      </div>
    </Paper>
  )
}
