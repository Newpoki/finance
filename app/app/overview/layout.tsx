type OverviewLayoutProps = {
  children: React.ReactNode
  dialog: React.ReactNode
}

export default function OverviewLayout({
  children,
  dialog,
}: OverviewLayoutProps) {
  return (
    <>
      {children}
      {dialog}
    </>
  )
}
