"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import CarretLeft from "@/icons/carret-left.svg"

export const TransactionEditGoBackButton = () => {
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.back()
  }, [router])

  return (
    <>
      <Button
        className="flex md:hidden"
        size="icon"
        variant="ghost"
        type="button"
        onClick={handleClick}
      >
        <CarretLeft />
      </Button>

      <Button
        className="hidden gap-2 md:flex"
        type="button"
        onClick={handleClick}
      >
        <CarretLeft />

        <span>Go Back</span>
      </Button>
    </>
  )
}
