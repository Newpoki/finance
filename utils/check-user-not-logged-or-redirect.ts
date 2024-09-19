"use server"

import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"

export const checkUserNotLoggedOrRedirect = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect("/app/overview")
  }
}
