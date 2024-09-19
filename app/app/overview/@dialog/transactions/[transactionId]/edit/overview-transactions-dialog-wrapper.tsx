"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

type DialogWrapperProps = {
  children: React.ReactNode
  redirectUrl: string
}

export const OverviewTransactionsDialogWrapper = ({
  children,
  redirectUrl,
}: DialogWrapperProps) => {
  const router = useRouter()

  const handleOpenChange = () => {
    // When dialog close animation is done we can redirect
    setTimeout(() => {
      router.push(redirectUrl)
    }, 300)
  }

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
