import { Button } from "@/components/ui/button"
import { Paper } from "@/components/ui/paper"
import { SkeletonInput } from "@/components/ui/skeleton"
import { SaveIcon } from "lucide-react"
import { AccountSignoutButton } from "./account-signout-button"
import { AccountCredentialsComingSoonAlert } from "./credentials/account-credentials-coming-soon-alert"

export default function AccountLoadingPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Account</h1>
        <AccountSignoutButton disabled />
      </div>

      <div className="flex w-full flex-col gap-8 xl:grid xl:grid-cols-[2fr_1fr]">
        <Paper className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h2>Profile</h2>
          </div>

          <p className="text-grey-500">
            Tell us more about you. We&apos;ll call you by your first name.
          </p>

          <div className="flex flex-1 flex-col gap-4">
            <section className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
            </section>

            <Button className="w-full gap-2 md:w-fit" disabled>
              <SaveIcon />
              <span>Save</span>
            </Button>
          </div>
        </Paper>

        <Paper className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h2>Credentials</h2>
          </div>

          <AccountCredentialsComingSoonAlert />

          <div className="flex flex-1 flex-col gap-4">
            <section className="flex flex-1 flex-col gap-4">
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
            </section>

            <Button className="w-full gap-2 md:w-fit" disabled>
              <SaveIcon />
              <span>Save</span>
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  )
}
