import { fetchTransactionById } from "./fetch-transaction-by-id"

export type Transaction = NonNullable<
  Awaited<ReturnType<typeof fetchTransactionById>>
>
