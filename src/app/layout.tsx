export const metadata = {
  title: "GTL studio",
  description: "Panel administracyjny GTL",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{margin: 0}}>{children}</body>
    </html>
  )
}
