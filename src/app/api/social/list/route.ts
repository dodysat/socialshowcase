import { SocialType } from "@/dto/social"
import { getSession } from "@/helpers/session"
import { fetchChannel } from "@/lib/youtube/youtube"
import { addSocial, getSocial, getSocials } from "@/repository/social"
import { setChannel } from "@/repository/youtube"

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
