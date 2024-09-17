import { signOutAction } from "@/app/(auth-pages)/sign-out/sign-out-actions"
import { Button } from "@/components/ui/button"
import { DashboardBalances } from "./dashboard-balances"

export default async function AppPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Overview</h1>

      <DashboardBalances />

      <form>
        <Button formAction={signOutAction}>Sign out</Button>
      </form>
    </div>
  )
}
