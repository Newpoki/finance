"use server"

"use server"

import { createClient } from "@/utils/supabase/server"
import { ServerResponse } from "@/app/server-response"
import { revalidatePath } from "next/cache"
import { TransactionCategory } from "./account-transactions-categories-types"
import { fetchCurrentUserTransactionCategories } from "./fetch-current-user-transaction-categories"

type DeleteTransactionParams = {
  id: TransactionCategory["id"]
}

export const deleteTransactionCategory = async ({
  id,
}: DeleteTransactionParams): Promise<ServerResponse> => {
  const supabase = createClient()

  const currentUserTransactionCategories =
    await fetchCurrentUserTransactionCategories()

  if (currentUserTransactionCategories.length <= 1) {
    return {
      type: "generic",
      // This shouldn't happen as front-end hidding delete button if there's only 1
      message: "You must have at least one transaction category",
    }
  }

  const { error } = await supabase
    .from("transaction_category")
    .delete()
    .match({ id })

  if (error) {
    return { type: "generic", message: error.message }
  }

  revalidatePath("/app")
  return { type: "success", data: null }
}
