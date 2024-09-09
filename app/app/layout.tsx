import { Navigation } from "./navigation/navigation"

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex w-full flex-1">
      <Navigation />

      {/* Adding some padding bottom on smaller screen to compensate the fixed navigation bar */}
      <div className="relative flex w-full flex-1 flex-col px-4 py-6 pb-[76px] transition-transform md:px-10 md:py-8 md:pb-[102px] xl:w-[calc(100%-88px)] xl:translate-x-[88px] xl:pb-8 xl:peer-data-[expanded=true]:w-[calc(100%-300px)] xl:peer-data-[expanded=true]:translate-x-[300px]">
        {children}
      </div>
    </div>
  )
}
