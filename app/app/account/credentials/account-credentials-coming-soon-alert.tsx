import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const AccountCredentialsComingSoonAlert = () => {
  return (
    <Alert variant="default">
      <AlertTitle>Coming Soon!</AlertTitle>
      <AlertDescription>
        Credentials update is disabled at the moment.
      </AlertDescription>
    </Alert>
  )
}
