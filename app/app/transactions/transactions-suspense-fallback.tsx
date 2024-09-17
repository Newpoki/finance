import { Skeleton } from "@/components/ui/skeleton"
import range from "lodash.range"

export const TransactionsSuspenseFallback = () => {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-6">
        <Skeleton className="h-11 w-full max-w-[320px]" />

        <div className="flex items-center gap-6">
          <Skeleton className="h-6 w-6 md:h-11 md:w-[170px]" />
          <Skeleton className="h-6 w-6 md:h-11 md:w-[230px]" />
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-2">
        {range(10).map((item) => {
          return (
            <li key={item}>
              <Skeleton className="h-14" />
            </li>
          )
        })}
      </ul>
    </>
  )
}
