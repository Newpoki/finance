"use client"

import Logo from "@/app/logo.svg"
import LogoMini from "@/app/logo-mini.svg"
import { NavigationSidebarItem } from "./navigation-sidebar-item"
import Home from "@/icons/home.svg"
import ArrowsDownUp from "@/icons/arrows-down-up.svg"
import ChartDonut from "@/icons/chart-donut.svg"
import JarFill from "@/icons/jar-fill.svg"
import Receipt from "@/icons/receipt.svg"
import ArrowFatLinesLeft from "@/icons/arrow-fat-lines-left.svg"
import { useCallback, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { NavigationSidebarLink } from "./navigation-sidebar-link"

export const NavigationSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)

  const pathname = usePathname()

  const LogoComponent = useMemo(() => {
    return isExpanded ? Logo : LogoMini
  }, [isExpanded])

  const handleToggleSidebar = useCallback(() => {
    setIsExpanded((current) => !current)
  }, [])

  return (
    <section
      className={cn(
        "fixed bottom-0 flex w-full flex-col rounded-t-lg bg-primary px-4 pt-2 transition-all md:px-10 xl:relative xl:w-[300px] xl:rounded-r-2xl xl:pb-6 xl:pl-0 xl:pr-6 xl:pt-10",
        {
          "pr-0 xl:w-[88px]": !isExpanded,
        },
      )}
    >
      <div className="hidden px-8 xl:block">
        <LogoComponent className="mb-16 text-white" />
      </div>

      <nav>
        <ul className="flex justify-around xl:flex-col xl:justify-start">
          <NavigationSidebarLink
            icon={<Home className="h-6 w-6" />}
            isExpanded={isExpanded}
            isActive={pathname === "/app"}
            href="/app"
          >
            Overview
          </NavigationSidebarLink>

          <NavigationSidebarLink
            icon={<ArrowsDownUp className="h-6 w-6" />}
            isExpanded={isExpanded}
            isActive={pathname.startsWith("/transactions")}
            href="/app"
          >
            Transactions
          </NavigationSidebarLink>

          <NavigationSidebarLink
            icon={<ChartDonut className="h-6 w-6" />}
            isExpanded={isExpanded}
            isActive={pathname.startsWith("/budgets")}
            href="/budgets"
          >
            Budgets
          </NavigationSidebarLink>

          <NavigationSidebarLink
            icon={<JarFill className="h-6 w-6" />}
            isExpanded={isExpanded}
            isActive={pathname.startsWith("/pots")}
            href="/pots"
          >
            Pots
          </NavigationSidebarLink>

          <NavigationSidebarLink
            icon={<Receipt className="h-6 w-6" />}
            isExpanded={isExpanded}
            isActive={pathname.startsWith("/recurring-bills")}
            href="/recurring-bills"
          >
            Recurring bills
          </NavigationSidebarLink>
        </ul>
      </nav>

      <button
        className="mt-auto hidden xl:block"
        type="button"
        onClick={handleToggleSidebar}
      >
        <NavigationSidebarItem
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
        </NavigationSidebarItem>
      </button>
    </section>
  )
}
