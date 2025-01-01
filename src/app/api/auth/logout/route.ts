import { destroySession, getSession } from "@/helpers/session"

export async function POST(): Promise<Response> {
  const session = await getSession()
  if (session?.email) {
    await destroySession()
    return new Response(JSON.stringify({ message: "Berhasil logout" }))
  }

  return new Response(
    JSON.stringify({ message: "Silahkan login terlebih dahulu" }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  )
}
