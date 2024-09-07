import { cn } from "@/lib/utils"
import Logo from "@/app/logo.svg"

type AuthHeroProps = {
  className?: string
}

export const AuthHero = ({ className }: AuthHeroProps) => {
  return (
    <section
      className={cn(
        'flex flex-col justify-between rounded-xl bg-[url("/auth-hero-illustration.jpg")] bg-cover bg-no-repeat p-10',
        className,
      )}
    >
      <Logo className="text-white" />

      <div className="flex flex-col gap-6">
        <h1 className="text-white">
          Keep track of your money and save for your future
        </h1>
        <p className="text-white">
          Personal finance app puts you in control of your spending. Trak
          transactions, set budgets, and add to savings pots easily.
        </p>
      </div>
    </section>
  )
}
