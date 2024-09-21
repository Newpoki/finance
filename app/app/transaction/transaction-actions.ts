"use server"

import { transformZodErrors } from "@/utils/transform-zod-errors"
import { Transaction, transactionFormValuesSchema } from "./transaction-types"
import { createClient } from "@/utils/supabase/server"
import { ServerResponse } from "@/app/server-response"
import { fetchCurrentUserProfile } from "../profile/fetch-current-user-profile"
import { revalidatePath } from "next/cache"

export const upsertTransactionAction = async (
  data: unknown,
): Promise<ServerResponse<{ transaction: Transaction }>> => {
  const parsed = transactionFormValuesSchema.safeParse(data)

  if (!parsed.success) {
    return {
      type: "validation",
      fields: transformZodErrors(parsed.error),
    }
  }

  const profile = await fetchCurrentUserProfile()

  const supabase = createClient()

  const { error, data: transaction } = await supabase
    .from("transactions")
    .upsert({
      // TODO Check if can avoid cast
      amount_cents: parsed.data.amount as number,
      category: parsed.data.category,
      currency_code: profile.currency_code,
      date: parsed.data.date.toISOString(),
      name: parsed.data.name,
      user_id: profile.id,
      id: parsed.data.id ?? undefined,
    })
    .select()
    .single()

  if (error) {
    return { type: "generic", message: error.message }
  }

  revalidatePath("/app")
  return { type: "success", data: { transaction } }
}
