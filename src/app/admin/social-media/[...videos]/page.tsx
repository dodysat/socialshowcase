import { Hostname } from "@/helpers/hostname"
import { getSocial } from "@/repository/social"
import { getVideos } from "@/repository/youtube"

export default async function MateriAdd({
  params,
}: {
  readonly params: Promise<{ readonly videos: readonly string[] }>
}) {
  const socialId = (await params).videos
  const hostname = await Hostname()
  const social = await getSocial(hostname, socialId[0])
  console.log("Social", social)
  const videos = await getVideos(hostname, socialId[0])
  console.log("videos", videos)

  return (
    <div>
      <h2>Hello</h2>
      <h2>{socialId}</h2>
    </div>
  )
}
