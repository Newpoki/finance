import { Navigation } from "./navigation/navigation"

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex w-full flex-1">
      <Navigation />

      {children}
    </div>
  )
}
