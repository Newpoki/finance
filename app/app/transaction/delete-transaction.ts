"use server"

import { createClient } from "@/utils/supabase/server"
import { Transaction } from "./transaction-types"
import { ServerResponse } from "@/app/server-response"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type DeleteTransactionParams = {
  id: Transaction["id"]
}

export const deleteTransaction = async ({
  id,
}: DeleteTransactionParams): Promise<ServerResponse | undefined> => {
  const supabase = createClient()

  const { error } = await supabase.from("transactions").delete().match({ id })

  if (error) {
    return { type: "generic", message: error.message }
  }

  revalidatePath("/app")
  redirect("/app/transactions")
}
