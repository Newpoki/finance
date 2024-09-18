import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { fetchOverviewBalances } from "./fetch-overview-balances"
import { formatCents } from "@/currency/format-cents"

export const OverviewBalances = async () => {
  const balances = await fetchOverviewBalances()

  //   TODO: Throw error in fetchOverviewBalances instead and use error.tsx
  if (balances == null) {
    return null
  }

  const currentBalance = formatCents({
    cents: balances.current_balance,
    locale: "fr-FR",
    currencyCode: "EUR",
    signDisplay: "never",
  })

  const currentMonthIncome = formatCents({
    cents: balances.incomes,
    locale: "fr-FR",
    currencyCode: "EUR",
    signDisplay: "never",
  })

  const currentMonthExpense = formatCents({
    cents: balances.expenses,
    locale: "fr-FR",
    currencyCode: "EUR",
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
