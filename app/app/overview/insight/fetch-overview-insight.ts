"use server"

import { createClient } from "@/utils/supabase/server"
import { fetchCurrentUserProfile } from "../../account/profile/fetch-current-user-profile"
import { fetchCurrentUserTransactionCategories } from "../../account/categories/fetch-current-user-transaction-categories"
import { addDays, formatISO, lastDayOfMonth, set } from "date-fns"
import { TZDate } from "@date-fns/tz"

export const fetchOverviewInsight = async () => {
  const supabase = createClient()

  const currentUserProfile = await fetchCurrentUserProfile()
  const currentUserTransactionCategories =
    await fetchCurrentUserTransactionCategories()

  // Getting current time in the user timezone
  const currentDateInUserTZ = new TZDate(
    new Date(),
    currentUserProfile.timezone,
  )

  // Then, getting the first day of the month
  const firstDayOfMonthDate = set(currentDateInUserTZ, {
    date: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })

  // PostgreSQL query will take transaction interval exclude end date -> [startDate, endDate[
  const lastDayOfMonthDate = addDays(lastDayOfMonth(firstDayOfMonthDate), 1)

  const firstDateOfMonth = formatISO(firstDayOfMonthDate)
  const lastDateOfMonth = formatISO(lastDayOfMonthDate)

  const { data, error } = await supabase.rpc("sum_amounts_per_category", {
    _user_id: currentUserProfile.id,
    _category_ids: currentUserTransactionCategories.map(
      (category) => category.id,
    ),
    _start_date: firstDateOfMonth,
    _end_date: lastDateOfMonth,
  })

  if (data == null) {
    throw new Error(error.message)
  }

  return data
}
