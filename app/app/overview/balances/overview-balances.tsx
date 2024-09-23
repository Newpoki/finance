import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { fetchOverviewBalances } from "./fetch-overview-balances"
import { formatCents } from "@/currency/format-cents"
import { fetchCurrentUserProfile } from "../../profile/fetch-current-user-profile"
import { OverviewBalancesTooltip } from "./overview-balances-tooltip"

export const OverviewBalances = async () => {
  const balancesPromises = fetchOverviewBalances()
  const profilePromises = fetchCurrentUserProfile()

  const [balances, profile] = await Promise.all([
    balancesPromises,
    profilePromises,
  ])

  const currentBalance = formatCents({
    cents: balances.current_balance,
    locale: profile.locale,
    currencyCode: profile.currency_code,
    signDisplay: "never",
  })

  const currentMonthIncome = formatCents({
    cents: balances.incomes,
    locale: profile.locale,
    currencyCode: profile.currency_code,
    signDisplay: "never",
  })

  const currentMonthExpense = formatCents({
    cents: balances.expenses,
    locale: profile.locale,
    currencyCode: profile.currency_code,
  })

  return (
    <section className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-6">
      <Card inverted>
        <CardTitle>Current balance</CardTitle>
        <CardContent>{currentBalance}</CardContent>
      </Card>

      <Card>
        <CardTitle className="flex w-full items-center justify-between gap-2">
          <span>Income</span>
          <OverviewBalancesTooltip title="Income of the current month" />
        </CardTitle>
        <CardContent>{currentMonthIncome}</CardContent>
      </Card>

      <Card>
        <CardTitle className="flex w-full items-center justify-between gap-2">
          <span>Expenses</span>
          <OverviewBalancesTooltip title="Expenses of the current month" />
        </CardTitle>
        <CardContent className="text-destructive">
          {currentMonthExpense}
        </CardContent>
      </Card>
    </section>
  )
}
