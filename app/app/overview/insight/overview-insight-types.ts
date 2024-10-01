import { z } from "zod"
import { fetchOverviewInsight } from "./fetch-overview-insight"

export type OverviewInsightData = Awaited<
  ReturnType<typeof fetchOverviewInsight>
>

export const overviewInsightChartEntrySchema = z.object({
  category_id: z.string(),
  fill: z.string(),
  incomes_sum: z.number(),
  abs_expenses_sum: z.number(),
  category_name: z.string(),
})

export type OverviewInsightChartEntry = z.infer<
  typeof overviewInsightChartEntrySchema
>
