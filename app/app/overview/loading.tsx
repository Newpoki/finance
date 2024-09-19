// import { OverviewBalances } from "./balances/overview-balances"

import { Skeleton } from "@/components/ui/skeleton"
import range from "lodash.range"

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
    </div>
  )
}
