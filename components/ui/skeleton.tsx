import { cn } from "@/lib/utils"

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>
export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

type SkeletonInputProps = SkeletonProps & {
  noLabel?: boolean
}

export const SkeletonInput = ({
  noLabel = false,
  className,
  ...others
}: SkeletonInputProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {!noLabel && <Skeleton className="h-4 w-10" />}
      <Skeleton {...others} className="h-11 w-full" />
    </div>
  )
}

export const SkeletonBadge = ({ className, ...others }: SkeletonProps) => {
  return <Skeleton {...others} className={cn("h-[22px] w-6", className)} />
}
