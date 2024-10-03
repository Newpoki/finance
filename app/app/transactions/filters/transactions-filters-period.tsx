import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Locale, Timezone } from "../../account/profile/account-profile-types"
import { useCallback, useMemo } from "react"
import { ParsedTransactionsSearchParams } from "../parse-transactions-search-params"
import { formatDate } from "@/date/format-date"
import { format } from "date-fns"
import { DateRange, OnSelectHandler } from "react-day-picker"

type TransactionsFiltersPeriodProps = {
  parsedSearchParams: ParsedTransactionsSearchParams
  locale: Locale
  timezone: Timezone
  onFiltersChange: (newFilters: Partial<ParsedTransactionsSearchParams>) => void
}

export const TransactionsFiltersPeriod = ({
  parsedSearchParams,
  locale,
  timezone,
  onFiltersChange,
}: TransactionsFiltersPeriodProps) => {
  const displayedPeriod = useMemo(() => {
    const startDate = formatDate({
      date: parsedSearchParams.start_at,
      locale: locale,
      timeZone: timezone,
    })

    const endDate = formatDate({
      date: parsedSearchParams.end_at,
      locale: locale,
      timeZone: timezone,
    })

    return `Between ${startDate} and ${endDate}`
  }, [locale, parsedSearchParams.end_at, parsedSearchParams.start_at, timezone])

  const calendarRange = useMemo(() => {
    return {
      from: new Date(parsedSearchParams.start_at),
      to: new Date(parsedSearchParams.end_at),
    }
  }, [parsedSearchParams.end_at, parsedSearchParams.start_at])

  const handleRangeChange: OnSelectHandler<DateRange> = useCallback(
    (range) => {
      if (range.to == null || range.from == null) {
        return
      }

      const startAt = format(range.from, "yyyy-MM-dd")
      const endAt = format(range.to, "yyyy-MM-dd")

      onFiltersChange({ start_at: startAt, end_at: endAt })
    },
    [onFiltersChange],
  )

  //   TODO: Create pill component based on outiled button, that will uses 2 different calendar

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outlined"
          className={cn("h-11 w-fit gap-4 text-left font-normal")}
        >
          {displayedPeriod}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          selected={calendarRange}
          mode="range"
          onSelect={handleRangeChange}
          timeZone={timezone}
          required
        />
      </PopoverContent>
    </Popover>
  )
}
