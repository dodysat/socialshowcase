import "server-only"
import { redirect } from "next/navigation"
import { getSession } from "@/helpers/session"
import { Navbar } from "./Navbar"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const sessionData = await getSession()
  if (!sessionData?.email) {
    redirect("/auth/send-otp")
  }
  return (
    <div>
      <Navbar>{children}</Navbar>
    </div>
  )
}
