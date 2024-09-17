import Logo from "@/public/logo/logo.svg"
import { AuthHero } from "./auth-hero"

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex w-full flex-1 flex-col xl:p-5">
      <header className="flex w-full justify-center rounded-b-lg bg-primary px-10 py-6 xl:hidden xl:flex-row">
        <Logo className="text-white" />
      </header>

      <div className="flex flex-1 xl:grid xl:grid-cols-[40%_60%]">
        <AuthHero className="hidden xl:flex" />
        <div className="my-auto flex w-full justify-center p-4">{children}</div>
      </div>
    </div>
  )
}
