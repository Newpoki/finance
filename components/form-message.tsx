import { cn } from "@/lib/utils"

export type FormMessageProps = {
  type?: "error" | "default"
  content?: string
}

export function FormMessage({ type = "default", content }: FormMessageProps) {
  if (content == null) {
    return null
  }

  return (
    <div className="body2 flex w-full flex-col gap-2 text-right">
      <div
        className={cn("text-foreground text-grey-500", {
          "border-destructive text-destructive": type === "error",
        })}
      >
        {content}
      </div>
    </div>
  )
}
