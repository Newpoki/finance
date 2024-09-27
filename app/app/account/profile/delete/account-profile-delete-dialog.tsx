"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Profile } from "../account-profile-types"
import { AccountProfileDeleteDialogForm } from "./account-profile-delete-dialog-form"
import { DeleteIcon } from "lucide-react"
import { useCallback, useState } from "react"

type AccountProfileDeleteDialogProps = {
  disabled: boolean
  profile: Profile
}

export const AccountProfileDeleteDialog = ({
  disabled,
  profile,
}: AccountProfileDeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenDialog = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleToggleDialog = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={handleToggleDialog}>
      <Button
        variant="error"
        className="w-full gap-2 md:w-fit"
        disabled={disabled}
        type="button"
        onClick={handleOpenDialog}
      >
        <DeleteIcon />
        <span>Delete Account</span>
      </Button>

      <DialogContent>
        <AccountProfileDeleteDialogForm
          profile={profile}
          closeDialog={handleCloseDialog}
        />
      </DialogContent>
    </Dialog>
  )
}
