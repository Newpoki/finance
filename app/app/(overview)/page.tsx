import { signOutAction } from "@/app/(auth-pages)/sign-out/sign-out-actions"
import { Button } from "@/components/ui/button"
import { OverviewBalances } from "./balances/overview-balances"
import { OverviewTransactionsList } from "./transactions/overview-transactions-list"

export default async function OverviewPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Overview</h1>

      <OverviewBalances />

      {/* TODO Check how to properly handle errors */}
      <div className="flex flex-1 flex-col gap-4 md:gap-6">
        <OverviewTransactionsList />

        <form>
          <Button formAction={signOutAction}>Sign out</Button>
        </form>
      </div>
    </div>
  )
}
