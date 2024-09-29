"use server"

import { ServerResponse } from "@/app/server-response"
import { accountTransactionsCategoriesFormValuesSchema } from "../account-transactions-categories-types"
import { transformZodErrors } from "@/utils/transform-zod-errors"
import { fetchCurrentUserProfile } from "../../profile/fetch-current-user-profile"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export const upsertTransactionCategory = async (
  data: unknown,
): Promise<ServerResponse> => {
  const parsed = accountTransactionsCategoriesFormValuesSchema.safeParse(data)

  if (!parsed.success) {
    return {
      type: "validation",
      fields: transformZodErrors(parsed.error),
    }
  }

  const profile = await fetchCurrentUserProfile()

  const supabase = createClient()

  const { error } = await supabase
    .from("transaction_category")
    .upsert({
      ...parsed.data,
      id: parsed.data.id ?? undefined,
      user_id: profile.id,
    })
    .select()
    .single()

  if (error) {
    return { type: "generic", message: error.message }
  }

  revalidatePath("/app")
  return { type: "success", data: null }
}
