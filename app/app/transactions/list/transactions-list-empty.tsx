import NoResultsIllustration from "@/public/illustrations/no-results-illustration.svg"

export const TransactionsListEmpty = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <NoResultsIllustration className="max-w-[400px]" />
      <div className="text-center">
        <p className="font-bold">No transactions yet</p>
        <p className="body2">
          Start keeping track of your money by adding your first transaction !
        </p>
      </div>
    </div>
  )
}
