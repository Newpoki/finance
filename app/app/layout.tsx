import { NavigationSidebar } from "./navigation/sidebar/navigation-sidebar"

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex w-full flex-1">
      <NavigationSidebar />

      {children}
    </div>
  )
}
