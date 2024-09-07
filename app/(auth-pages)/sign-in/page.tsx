import { signInAction } from "@/app/actions"
import { FormMessage, Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Paper } from "@/components/ui/paper"
import Link from "next/link"
import { SigninForm } from "./sign-in-form"

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <Paper className="flex w-full max-w-[560px] flex-col gap-8 px-5 py-6">
      <h1>Login</h1>

      <SigninForm />

      <p className="flex justify-center gap-2">
        <span className="text-grey-500">Already have an account ?</span>
        <Link href="/sign-up" className="body1 font-bold underline">
          Login
        </Link>
      </p>
    </Paper>
  )
}
