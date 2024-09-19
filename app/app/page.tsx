import { checkUserNotLoggedOrRedirect } from "@/utils/check-user-not-logged-or-redirect"

export default async function AppPage() {
  await checkUserNotLoggedOrRedirect()
}
