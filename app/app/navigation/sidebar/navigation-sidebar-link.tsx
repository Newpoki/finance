import Link from "next/link"
import {
  NavigationSidebarItem,
  NavigationSidebarItemProps,
} from "./navigation-sidebar-item"
import { Url } from "next/dist/shared/lib/router/router"

type NavigationSidebarLinkProps = NavigationSidebarItemProps & {
  href: Url
}

export const NavigationSidebarLink = ({
  children,
  href,
  icon,
  isExpanded,
  isActive,
}: NavigationSidebarLinkProps) => {
  return (
    <li>
      <Link href={href}>
        <NavigationSidebarItem
          icon={icon}
          isExpanded={isExpanded}
          isActive={isActive}
        >
          {children}
        </NavigationSidebarItem>
      </Link>
    </li>
  )
}
