import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"
import { overviewInsightChartEntrySchema } from "./overview-insight-types"
import { formatCents } from "@/currency/format-cents"
import { Profile } from "../../account/profile/account-profile-types"

export type OverviewInsightChartTooltipContentFormatterProps = {
  item: Payload<ValueType, NameType>
  currentUserProfile: Profile
}

export const OverviewInsightChartTooltipContentFormatter = ({
  item,
  currentUserProfile,
}: OverviewInsightChartTooltipContentFormatterProps) => {
  const parsed = overviewInsightChartEntrySchema.parse(item.payload)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div
          className="h-3 w-3 shrink-0 rounded-[2px]"
          style={{ backgroundColor: parsed.fill }}
        />
        <p className="header3 font-normal">{parsed.category_name}</p>
      </div>

      <ul className="body1">
        <li>
          <span className="font-bold">Expenses : </span>
          <span>
            {formatCents({
              // This is the absolute sum of expenses, we must convert it back to negative
              cents: -parsed.abs_expenses_sum,
              currencyCode: currentUserProfile.currency_code,
              locale: currentUserProfile.locale,
            })}
          </span>
        </li>

        <li>
          <span className="font-bold">Incomes : </span>
          <span>
            {formatCents({
              cents: parsed.incomes_sum,
              currencyCode: currentUserProfile.currency_code,
              locale: currentUserProfile.locale,
              signDisplay: "never",
            })}
          </span>
        </li>
      </ul>
    </div>
  )
}
