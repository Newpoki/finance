export type Message =
  | { success: string }
  | { error: string }
  | { message: string }

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="body2 flex w-full flex-col gap-2 text-right">
      {"error" in message && (
        <div className="border-destructive text-destructive">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground text-grey-500">{message.message}</div>
      )}
    </div>
  )
}
