import { Paper } from "@/components/ui/paper"
import Link from "next/link"
import { SigninForm } from "./sign-in-form"

export default function Login() {
  return (
    <Paper className="flex w-full max-w-[560px] flex-col gap-8 px-5 py-6">
      <h1>Login</h1>

      <SigninForm />

      <p className="flex justify-center gap-2">
        <span className="text-grey-500">Need to create an account?</span>
        <Link href="/sign-up" className="body1 font-bold underline">
          Sign Up
        </Link>
      </p>
    </Paper>
  )
}
