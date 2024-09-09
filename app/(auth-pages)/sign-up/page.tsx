import { Paper } from "@/components/ui/paper"
import Link from "next/link"
import { SignupForm } from "./sign-up-form"
import { checkUserNotLoggedOrRedirect } from "@/utils/check-user-not-logged-or-redirect"

export default async function Signup() {
  await checkUserNotLoggedOrRedirect()

  return (
    <Paper className="flex w-full max-w-[560px] flex-col gap-8">
      <h1>Sign up</h1>

      <SignupForm />

      <p className="flex justify-center gap-2">
        <span className="text-grey-500">Already have an account ?</span>
        <Link href="/sign-in" className="body1 font-bold underline">
          Login
        </Link>
      </p>
    </Paper>
  )
}
