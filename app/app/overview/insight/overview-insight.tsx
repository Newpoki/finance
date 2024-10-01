import { Paper } from "@/components/ui/paper"
import { fetchOverviewInsight } from "./fetch-overview-insight"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CarretLeft from "@/icons/carret-left.svg"
import { OverviewInsightChart } from "./overview-insight-chart"
import { fetchCurrentUserProfile } from "../../account/profile/fetch-current-user-profile"

//   {/* TODO: Donuts with expenses for selected category for report of selected period */}
//   {/* TODO: AreaChart stacked for selected category for selected period for expenses and incomes */}
export const OverviewInsight = async () => {
  const overviewInsightPromise = fetchOverviewInsight()
  const currentUserProfilePromise = fetchCurrentUserProfile()

  const [insightData, currentUserProfile] = await Promise.all([
    overviewInsightPromise,
    currentUserProfilePromise,
  ])

  return (
    <Paper className="flex flex-col gap-4">
      <div className="-mr-4 -mt-4 flex items-center justify-between gap-2">
        <h2>Insight</h2>

        <Button variant="ghost" asChild>
          <Link href="/app/reports" className="flex items-center gap-3">
            <span>See details</span>

            <CarretLeft className="rotate-180" />
          </Link>
        </Button>
      </div>

      <OverviewInsightChart
        insightData={insightData}
        currentUserProfile={currentUserProfile}
      />
    </Paper>
  )
}
