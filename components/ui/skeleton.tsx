import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

type SkeletonInputProps = {
  noLabel?: boolean
}

export const SkeletonInput = ({ noLabel = false }: SkeletonInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {!noLabel && <Skeleton className="h-4 w-10" />}
      <Skeleton className="h-11 w-full" />
    </div>
  )
}

export { Skeleton }
