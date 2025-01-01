export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
