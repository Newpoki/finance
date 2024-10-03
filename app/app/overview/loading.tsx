// import { OverviewBalances } from "./balances/overview-balances"

import { Button } from "@/components/ui/button"
import { Paper } from "@/components/ui/paper"
import { Skeleton } from "@/components/ui/skeleton"
import range from "lodash.range"
import CarretLeft from "@/icons/carret-left.svg"
import Link from "next/link"

export default function OverviewLoading() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Overview</h1>

      <section className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-6">
        {range(0, 3).map((item) => (
          <Skeleton
            key={item}
            className="h-[111px] w-full md:h-[101px] xl:h-[120px]"
          />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[3fr_2fr]">
        <Paper className="flex flex-col gap-4">
          <div className="-mr-4 -mt-4 flex items-center justify-between gap-2">
            <h2>Transactions</h2>

            <Button variant="ghost" asChild disabled>
              <Link
                href="/app/transactions"
                className="flex items-center gap-3"
              >
                <span>View All</span>
                <CarretLeft className="rotate-180" />
              </Link>
            </Button>
          </div>

          {range(0, 5).map((item) => (
            <Skeleton key={item} className="h-16 w-full" />
          ))}
        </Paper>

        <Paper className="flex flex-col gap-4">
          <div className="-mr-4 -mt-4 flex items-center justify-between gap-2">
            <h2>Insight</h2>

            <Button variant="ghost" disabled asChild>
              <Link href="/app/reports" className="flex items-center gap-3">
                <span>See details</span>

                <CarretLeft className="rotate-180" />
              </Link>
            </Button>
          </div>

          {/* Can't really have a PieChart skeleton, only displaying Skeleton for the text */}
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-3 w-28" />
          </div>
        </Paper>
      </section>
    </div>
  )
}
