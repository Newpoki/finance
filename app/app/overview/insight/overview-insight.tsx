import { fetchOverviewInsight } from "./fetch-overview-insight"

export const OverviewInsight = async () => {
  const toto = await fetchOverviewInsight()

  console.log({ toto: toto.data })

  return (
    <div>
      <p>lol</p>
      {/* TODO:  */}
      {/* TODO: Donuts with expenses for each category for overview insight of current month */}
      {/* TODO: Donuts with expenses for selected category for report of selected period */}
      {/* TODO: AreaChart stacked for selected category for selected period for expenses and incomes */}
    </div>
  )
}
