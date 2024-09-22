"use server"

import { transformZodErrors } from "@/utils/transform-zod-errors"
import { Transaction, transactionFormValuesSchema } from "./transaction-types"
import { createClient } from "@/utils/supabase/server"
import { ServerResponse } from "@/app/server-response"
import { fetchCurrentUserProfile } from "../profile/fetch-current-user-profile"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// The UI allow null to be a value, but we only want to allow not null numbers
const upsertTransactionValuesSchema = transactionFormValuesSchema.extend({
  amount: z.number(),
})

export const upsertTransactionAction = async (
  data: unknown,
): Promise<ServerResponse<{ transaction: Transaction }>> => {
  const parsed = upsertTransactionValuesSchema.safeParse(data)

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
      amount_cents: parsed.data.amount,
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
