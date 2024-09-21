import { Database } from "@/database.types"
import { fetchCurrentUserProfile } from "./fetch-current-user-profile"

export type Profile = Awaited<ReturnType<typeof fetchCurrentUserProfile>>

export type Locale = Database["public"]["Enums"]["locales"]
