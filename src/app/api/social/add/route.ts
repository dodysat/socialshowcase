import { SocialType } from "@/dto/social"
import { getSession } from "@/helpers/session"
import { fetchChannel } from "@/lib/youtube/youtube"
import { addSocial, getSocial } from "@/repository/social"
import { setChannel } from "@/repository/youtube"

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

  const socialExist = await getSocial(
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
    await addSocial(session.hostname, {
      id: channel.id,
      username: channel.snippet.customUrl,
      title: channel.snippet.title,
      description: channel.snippet.description,
      thumbnails: channel.snippet.thumbnails.high.url,
      type: SocialType.YOUTUBE,
    })

    await setChannel(session.hostname, channel)

    return new Response(
      JSON.stringify({
        message: "Berhasil menambahkan akun",
      })
    )
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
