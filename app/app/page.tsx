import { Button } from "@/components/ui/button"
import { checkUserLoggedOrRedirect } from "@/utils/check-user-logged-or-redirect"
import { InfoIcon } from "lucide-react"
import { signOutAction } from "../(auth-pages)/sign-out/sign-out-actions"

export default async function AppPage() {
  const user = await checkUserLoggedOrRedirect()

  return (
    <div className="flex w-full flex-1 flex-col gap-12">
      <div className="w-full">
        <div className="flex items-center gap-3 rounded-md bg-accent p-3 px-5 text-sm text-foreground">
          <InfoIcon size="16" strokeWidth={2} />
          This is a app page that you can only see as an authenticated user
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <h2 className="mb-4 text-2xl font-bold">Your user details</h2>
        <pre className="max-h-32 w-full overflow-auto rounded border p-3 font-mono text-xs">
          {JSON.stringify(user, null, 2)}
        </pre>

        <form>
          <Button formAction={signOutAction}>Sign out</Button>
        </form>
      </div>
    </div>
  )
}
