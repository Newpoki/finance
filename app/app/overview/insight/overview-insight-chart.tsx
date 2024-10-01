"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useMemo } from "react"
import {
  OverviewInsightChartEntry,
  OverviewInsightData,
} from "./overview-insight-types"
import { formatCents } from "@/currency/format-cents"
import { Profile } from "../../account/profile/account-profile-types"
import { OverviewInsightChartTooltipContentFormatter } from "./overview-insight-chart-tooltip-content-formatter"
import { OverviewInsightChartEmpty } from "./overview-insight-chart-empty"

export const description = "A donut chart with text"

type OverviewInsightChartProps = {
  insightData: OverviewInsightData
  currentUserProfile: Profile
}

type ChartData = {
  total_expenses_sum: number
  entries: Array<OverviewInsightChartEntry>
  config: ChartConfig
}

export const OverviewInsightChart = ({
  insightData,
  currentUserProfile,
}: OverviewInsightChartProps) => {
  const chartData = useMemo(() => {
    return insightData.reduce<ChartData>(
      (acc, entry) => {
        // We don't want in the chart data entries the category if there is no expenses
        if (entry.expenses_sum === 0) {
          return acc
        }

        acc.entries.push({
          category_id: entry.category_id,
          fill: entry.category_color,
          incomes_sum: entry.incomes_sum,
          // We need positive values, otherwise, Pie chart will not interpret it
          abs_expenses_sum: Math.abs(entry.expenses_sum),
          category_name: entry.category_name,
        })

        acc.config[entry.category_id] = {
          label: entry.category_name,
          color: entry.category_color,
        }

        acc.total_expenses_sum = acc.total_expenses_sum + entry.expenses_sum

        return acc
      },
      { total_expenses_sum: 0, entries: [], config: {} },
    )
  }, [insightData])

  if (chartData.entries.length === 0) {
    return <OverviewInsightChartEmpty />
  }

  return (
    <div className="max-h-[380px] w-full">
      <ChartContainer
        config={chartData.config}
        className="mx-auto aspect-square max-h-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name, item) => {
                  return (
                    <OverviewInsightChartTooltipContentFormatter
                      item={item}
                      currentUserProfile={currentUserProfile}
                    />
                  )
                }}
              />
            }
          />
          <Pie
            data={chartData.entries}
            dataKey="abs_expenses_sum"
            nameKey="category_id"
            innerRadius={120}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {formatCents({
                          cents: chartData.total_expenses_sum,
                          currencyCode: currentUserProfile.currency_code,
                          locale: currentUserProfile.locale,
                        })}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        spent this month
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  )
}
