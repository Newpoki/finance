import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, startAdornment, endAdornment, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-11 w-full items-center gap-3 rounded-md border border-input px-5 py-3 focus-within:border-primary hover:border-grey-500",
          className,
          { "opacity-50 hover:border-input": disabled },
        )}
      >
        {startAdornment}
        <input
          {...props}
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          disabled={disabled}
          ref={ref}
        />
        {endAdornment}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
