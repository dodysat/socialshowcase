import { getSession } from "@/helpers/session"
import { getSocials } from "@/repository/social"

export async function GET(req: Request): Promise<Response> {
  const session = await getSession()
  if (!session?.email) {
    return new Response(
      JSON.stringify({ error: "Silahkan login terlebih dahulu" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const socials = await getSocials(session.hostname)

  return new Response(JSON.stringify(socials), {
    headers: { "Content-Type": "application/json" },
  })
}
