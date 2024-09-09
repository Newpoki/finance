import { cn } from "@/lib/utils"

export type NavigationSidebarItemProps = {
  className?: string
  children: React.ReactNode
  icon: React.ReactNode
  isExpanded: boolean
  isActive?: boolean
}

export const NavigationSidebarItem = ({
  className,
  children,
  icon,
  isExpanded,
  isActive = false,
}: NavigationSidebarItemProps) => {
  return (
    <p
      className={cn(
        "relative flex flex-col items-center rounded-t-lg px-[22px] py-2 text-grey-300 hover:text-grey-100 md:gap-1 xl:flex-row xl:justify-start xl:rounded-l-none xl:rounded-r-xl xl:px-8 xl:py-4",
        className,
        {
          "border-b-4 border-green-500 bg-background text-foreground hover:text-foreground xl:border-b-0 xl:border-l-4":
            isActive,
          "xl:w-[90%]": !isExpanded,
        },
      )}
    >
      <span className={cn({ "text-green-500": isActive })}>{icon}</span>

      {isExpanded && (
        // Using absolute so there is no weird UI glitch when expanding/collapsing sidebar
        <span className="xl:header3 md:body2 hidden md:inline-block md:font-bold xl:absolute xl:left-[72px] xl:whitespace-nowrap">
          {children}
        </span>
      )}
    </p>
  )
}
