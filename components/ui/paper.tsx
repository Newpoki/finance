import { cn } from "@/lib/utils"

type PaperProps = React.DetailsHTMLAttributes<HTMLElement>

export const Paper = ({ className, children }: PaperProps) => {
  return (
    <section className={cn("rounded-xl bg-white", className)}>
      {children}
    </section>
  )
}
