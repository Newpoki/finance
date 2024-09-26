"use client"

import { Button } from "@/components/ui/button"
import { Paper } from "@/components/ui/paper"
import ErrorIllustration from "@/public/illustrations/error-illustration.svg"
import { useCallback } from "react"

type AccountErrorPageProps = {
  reset: () => void
}

export default function AccountErrorPage({ reset }: AccountErrorPageProps) {
  const handleResetError = useCallback(() => {
    reset()
  }, [reset])

  return (
    <div className="flex w-full flex-1 flex-col gap-8">
      <h1>Account</h1>

      <Paper className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <ErrorIllustration className="max-w-[400px] xl:max-w-[600px]" />
          <div className="flex w-full flex-col items-center text-center">
            <h2 className="font-bold">Oh no, something is broken</h2>
            <p className="mb-4">
              An unexpected error happen, thus we don&apos;t know why it id.
            </p>

            <Button type="button" onClick={handleResetError}>
              Try again
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}
