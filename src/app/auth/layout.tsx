import { Center } from "@mantine/core"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Center style={{ width: "100vw", height: "100vh" }}>
      <div>{children}</div>
    </Center>
  )
}
