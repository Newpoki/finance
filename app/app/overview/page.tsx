import { OverviewBalances } from "./balances/overview-balances"
import { OverviewTransactions } from "./transactions/overview-transactions"

export default async function OverviewPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Overview</h1>

      <OverviewBalances />

      <div className="flex flex-1 flex-col gap-4 md:gap-6">
        <OverviewTransactions />
      </div>
    </div>
  )
}
