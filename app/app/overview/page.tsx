import { OverviewBalances } from "./balances/overview-balances"
import { OverviewInsight } from "./insight/overview-insight"
import { OverviewTransactions } from "./transactions/overview-transactions"

export default async function OverviewPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Overview</h1>

      <OverviewBalances />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[3fr_2fr]">
        <OverviewTransactions />

        <OverviewInsight />
      </section>
    </div>
  )
}
