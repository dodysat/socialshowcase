import { SocialType } from "@/dto/social"
import { getSession } from "@/helpers/session"
import { fetchChannel } from "@/lib/youtube/youtube"
import { getSocialByType } from "@/repository/social"

export async function POST(req: Request): Promise<Response> {
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

  const body: { type: SocialType; username: string } = await req.json()

  if (!body.type || !body.username) {
    return new Response(
      JSON.stringify({ error: "Harus mengisi jenis akun dan username" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const socialExist = await getSocialByType(
    session.hostname,
    body.username,
    body.type
  )

  if (socialExist) {
    return new Response(
      JSON.stringify({
        error: "Akun sudah terdaftar",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  if (body.type === SocialType.YOUTUBE) {
    const channel = await fetchChannel(body.username)
    if (!channel) {
      return new Response(
        JSON.stringify({
          error: "Channel tidak ditemukan",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    return new Response(JSON.stringify(channel))
  }

  return new Response(
    JSON.stringify({
      error: "Jenis sosial media tidak valid",
    }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  )
}
