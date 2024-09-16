import NoResultsIllustration from "@/public/illustrations/no-results-illustration.svg"

export const TransactionsListNoResults = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <NoResultsIllustration className="max-w-[400px]" />
      <div className="text-center">
        <p className="font-bold">No transactions found</p>
        <p className="body2">
          We couldn&apos;t find any transaction matching your search. Try
          adjusting your filters or search terms.
        </p>
      </div>
    </div>
  )
}
