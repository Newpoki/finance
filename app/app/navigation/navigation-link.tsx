import Link from "next/link"
import { NavigationItem, NavigationItemProps } from "./navigation-item"
import { Url } from "next/dist/shared/lib/router/router"

type NavigationLinkProps = NavigationItemProps & {
  href: Url
}

export const NavigationLink = ({
  children,
  href,
  icon,
  isExpanded,
  isActive,
}: NavigationLinkProps) => {
  return (
    <li>
      <Link href={href}>
        <NavigationItem icon={icon} isExpanded={isExpanded} isActive={isActive}>
          {children}
        </NavigationItem>
      </Link>
    </li>
  )
}
