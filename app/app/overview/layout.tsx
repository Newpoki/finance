type OverviewLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function OverviewLayout({
  children,
  modal,
}: OverviewLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
