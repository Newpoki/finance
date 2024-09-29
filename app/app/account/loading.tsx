import { Button } from "@/components/ui/button"
import { Paper } from "@/components/ui/paper"
import { SkeletonBadge, SkeletonInput } from "@/components/ui/skeleton"
import { DeleteIcon, SaveIcon } from "lucide-react"
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

            <div className="flex flex-col gap-3 md:flex-row">
              <Button className="w-full gap-2 md:w-fit" disabled>
                <SaveIcon />
                <span>Save</span>
              </Button>

              <Button
                variant="error"
                className="w-full gap-2 md:w-fit"
                disabled
              >
                <DeleteIcon />
                <span>Delete Account</span>
              </Button>
            </div>
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

      <div className="flex w-full flex-col gap-8 xl:grid xl:grid-cols-[1fr_1fr]">
        <Paper className="flex flex-col gap-4">
          <h2>Transactions Categories</h2>

          <p className="text-grey-500">
            Here you can edit your available categories to fit your needs. Click
            on a category to edit or delete it.
          </p>

          <ul className="flex flex-wrap gap-2">
            <SkeletonBadge className="w-24" />
            <SkeletonBadge className="w-20" />
            <SkeletonBadge className="w-28" />
            <SkeletonBadge className="w-22" />
            <SkeletonBadge className="w-20" />
            <SkeletonBadge className="w-28" />
            <SkeletonBadge className="w-24" />
            <SkeletonBadge className="w-28" />
            <SkeletonBadge className="w-24" />
            <SkeletonBadge className="w-20" />
            <SkeletonBadge className="w-28" />
            <SkeletonBadge className="w-22" />
            <SkeletonBadge className="w-20" />
            <SkeletonBadge className="w-28" />
            <SkeletonBadge className="w-24" />
            <SkeletonBadge className="w-28" />
          </ul>

          <Button disabled type="button">
            Add New Transaction Category
          </Button>
        </Paper>
      </div>
    </div>
  )
}
