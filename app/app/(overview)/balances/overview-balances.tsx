import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { fetchOverviewBalances } from "./fetch-overview-balances"
import { formatCents } from "@/currency/format-cents"
import { fetchCurrentUserProfile } from "../../profile/fetch-current-user-profile"

export const OverviewBalances = async () => {
  const balancesPromises = fetchOverviewBalances()
  const profilePromises = fetchCurrentUserProfile()

  const [balances, profile] = await Promise.all([
    balancesPromises,
    profilePromises,
  ])

  console.log({ profile })

  //   TODO: Throw error in fetchOverviewBalances instead and use error.tsx
  if (balances == null) {
    return null
  }

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
        <CardTitle>Income</CardTitle>
        <CardContent>{currentMonthIncome}</CardContent>
      </Card>
      <Card>
        <CardTitle>Expenses</CardTitle>
        <CardContent className="text-destructive">
          {currentMonthExpense}
        </CardContent>
      </Card>
    </section>
  )
}
