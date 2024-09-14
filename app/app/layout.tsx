import { Navigation } from "./navigation/navigation"

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex w-full flex-1 flex-col xl:flex-row">
      <Navigation />

      {/* Adding some padding bottom on smaller screen to compensate the fixed navigation bar */}
      <div className="flex min-h-[100dvh] w-full flex-1 flex-col px-4 py-6 pb-[76px] md:px-10 md:py-8 md:pb-[102px] xl:pb-8">
        {children}
      </div>
    </div>
  )
}
