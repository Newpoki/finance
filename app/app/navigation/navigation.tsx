"use client"

import Logo from "@/app/logo.svg"
import LogoMini from "@/app/logo-mini.svg"
import { NavigationItem } from "./navigation-item"
import Home from "@/icons/home.svg"
import ArrowsDownUp from "@/icons/arrows-down-up.svg"
import ChartDonut from "@/icons/chart-donut.svg"
import JarFill from "@/icons/jar-fill.svg"
import Receipt from "@/icons/receipt.svg"
import ArrowFatLinesLeft from "@/icons/arrow-fat-lines-left.svg"
import { useCallback, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { NavigationLink } from "./navigation-link"

const toggleExpandedDataAttribute = (
  ref: React.RefObject<HTMLElement>,
  isExpanded: boolean,
) => {
  const navigationElement = ref.current

  if (navigationElement == null) {
    return
  }

  navigationElement.setAttribute("data-expanded", `${isExpanded}`)
}

const DEFAULT_IS_EXPANDED = true

export const Navigation = () => {
  const navigationRef = useRef<HTMLElement>(null)
  const [isExpanded, setIsExpanded] = useState(DEFAULT_IS_EXPANDED)

  const pathname = usePathname()

  const LogoComponent = useMemo(() => {
    return isExpanded ? Logo : LogoMini
  }, [isExpanded])

  const handleToggleSidebar = useCallback(() => {
    setIsExpanded((current) => {
      toggleExpandedDataAttribute(navigationRef, !current)

      return !current
    })
  }, [])

  return (
    <section
      className={cn(
        "peer fixed bottom-0 z-50 flex w-full flex-col rounded-t-lg bg-primary px-4 pt-2 transition-all md:px-10 xl:left-0 xl:top-0 xl:w-[300px] xl:rounded-l-none xl:rounded-r-2xl xl:pb-6 xl:pl-0 xl:pr-6 xl:pt-10",
        {
          "xl:w-[88px] xl:pr-0": !isExpanded,
        },
      )}
      data-expanded={DEFAULT_IS_EXPANDED}
      ref={navigationRef}
    >
      <div
        className={cn("hidden justify-center px-8 xl:flex", {
          "justify-start": isExpanded,
        })}
      >
        <LogoComponent className="mb-16 text-white" />
      </div>

      <nav>
        <ul className="flex justify-around xl:flex-col xl:justify-start">
          <NavigationLink
            icon={<Home className="h-6 w-6" />}
            isExpanded={isExpanded}
            isActive={pathname === "/app"}
            href="/app"
          >
            Overview
          </NavigationLink>

          <NavigationLink
            icon={<ArrowsDownUp className="h-6 w-6" />}
            isExpanded={isExpanded}
            isActive={pathname.startsWith("/app/transactions")}
            href="/app/transactions"
          >
            Transactions
          </NavigationLink>

          <NavigationLink
            icon={<ChartDonut className="h-6 w-6" />}
            isExpanded={isExpanded}
            isActive={pathname.startsWith("/app/budgets")}
            href="/app/budgets"
          >
            Budgets
          </NavigationLink>

          <NavigationLink
            icon={<JarFill className="h-6 w-6" />}
            isExpanded={isExpanded}
            isActive={pathname.startsWith("/app/pots")}
            href="/app/pots"
          >
            Pots
          </NavigationLink>

          <NavigationLink
            icon={<Receipt className="h-6 w-6" />}
            isExpanded={isExpanded}
            isActive={pathname.startsWith("/app/recurring-bills")}
            href="/app/recurring-bills"
          >
            Recurring bills
          </NavigationLink>
        </ul>
      </nav>

      <button
        className="mt-auto hidden xl:block"
        type="button"
        onClick={handleToggleSidebar}
      >
        <NavigationItem
          icon={
            <ArrowFatLinesLeft
              className={cn("h-6 w-6 transition-transform", {
                "rotate-180": !isExpanded,
              })}
            />
          }
          isExpanded={isExpanded}
        >
          Minimize Menu
        </NavigationItem>
      </button>
    </section>
  )
}
