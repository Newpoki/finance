// import { OverviewBalances } from "./balances/overview-balances"

import { Button } from "@/components/ui/button"
import { Paper } from "@/components/ui/paper"
import { Skeleton } from "@/components/ui/skeleton"
import range from "lodash.range"
import CarretLeft from "@/icons/carret-left.svg"

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

      <div className="flex flex-1 flex-col gap-4 md:gap-6">
        <Paper className="flex flex-col gap-4">
          <div className="-mr-4 -mt-4 flex items-center justify-between gap-2">
            <h2>Transactions</h2>

            <Button variant="ghost" asChild disabled>
              <div>
                <span>View All</span>
                <CarretLeft className="rotate-180" />
              </div>
            </Button>
          </div>

          {range(0, 5).map((item) => (
            <Skeleton key={item} className="h-16 w-full" />
          ))}
        </Paper>
      </div>
    </div>
  )
}
