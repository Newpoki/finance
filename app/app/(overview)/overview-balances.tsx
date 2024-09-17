import { Card, CardContent, CardTitle } from "@/components/ui/card"

export const OverviewBalances = () => {
  return (
    <section className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-6">
      <Card inverted>
        <CardTitle>Current balance</CardTitle>
        <CardContent>$4,836.00</CardContent>
      </Card>
      <Card>
        <CardTitle>Income</CardTitle>
        <CardContent>$3,814.25</CardContent>
      </Card>
      <Card>
        <CardTitle>Expenses</CardTitle>
        <CardContent>$1,700.50</CardContent>
      </Card>
    </section>
  )
}
