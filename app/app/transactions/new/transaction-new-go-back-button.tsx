"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import CarretLeft from "@/icons/carret-left.svg"

type TransactionNewGoBackButtonProps = {
  disabled?: boolean
}

export const TransactionNewGoBackButton = ({
  disabled = false,
}: TransactionNewGoBackButtonProps) => {
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.back()
  }, [router])

  return (
    <>
      <Button
        className="flex md:hidden"
        disabled={disabled}
        size="icon"
        variant="ghost"
        type="button"
        onClick={handleClick}
      >
        <CarretLeft />
      </Button>

      <Button
        className="hidden gap-2 md:flex"
        disabled={disabled}
        type="button"
        onClick={handleClick}
      >
        <CarretLeft />

        <span>Go Back</span>
      </Button>
    </>
  )
}
