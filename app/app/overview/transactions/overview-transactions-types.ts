import { fetchOverviewTransactions } from "./fetch-overview-transactions"

export type OverviewTransactions = Awaited<
  ReturnType<typeof fetchOverviewTransactions>
>
