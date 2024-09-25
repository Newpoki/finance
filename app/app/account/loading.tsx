import { Button } from "@/components/ui/button"
import { Paper } from "@/components/ui/paper"
import { SkeletonInput } from "@/components/ui/skeleton"
import { SaveIcon } from "lucide-react"
import { AccountSignoutButton } from "./account-signout-button"

export default function AccountLoadingPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1>Account</h1>
        <AccountSignoutButton disabled />
      </div>

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
            <SkeletonInput />
          </section>

          <Button className="w-full gap-2 md:w-fit" disabled>
            <SaveIcon />
            <span>Save</span>
          </Button>
        </div>
      </Paper>
    </div>
  )
}
