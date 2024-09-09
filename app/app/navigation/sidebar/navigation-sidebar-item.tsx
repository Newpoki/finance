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
        "relative flex items-center rounded-r-xl px-8 py-4 text-grey-300 hover:text-grey-100",
        className,
        {
          "border-l-4 border-green-500 bg-background text-foreground hover:text-foreground":
            isActive,
          "w-[90%]": !isExpanded,
        },
      )}
    >
      <span className={cn({ "text-green-500": isActive })}>{icon}</span>
      {isExpanded && (
        // Using absolute so there is no weird UI glitch when expanding/collapsing sidebar
        <span className="header3 absolute left-[72px] whitespace-nowrap">
          {children}
        </span>
      )}
    </p>
  )
}
