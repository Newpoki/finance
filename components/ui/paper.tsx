import { cn } from "@/lib/utils"

export type PaperProps = React.DetailsHTMLAttributes<HTMLElement>

export const Paper = ({ className, children }: PaperProps) => {
  return (
    <section className={cn("rounded-xl bg-white px-5 py-6 md:p-8", className)}>
      {children}
    </section>
  )
}
