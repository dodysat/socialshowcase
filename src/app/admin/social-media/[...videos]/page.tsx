import { SocialType } from "@/dto/social"
import { Hostname } from "@/helpers/hostname"
import { getSocial } from "@/repository/social"
import { getVideos } from "@/repository/youtube"
import { SimpleGrid } from "@mantine/core"
import { Breadcrumbs } from "@mantine/core"

import YoutubeVideos from "./youtubeVideos"
import Link from "next/link"
import { Video } from "@/dto/youtube"

export default async function DetailSocialPage({
  params,
}: {
  readonly params: Promise<{ readonly videos: readonly string[] }>
}) {
  const socialId = (await params).videos
  const hostname = await Hostname()
  const social = await getSocial(hostname, socialId[0])
  let YoutubeVideosData: Video[] = []
  if (social?.type === SocialType.YOUTUBE) {
    YoutubeVideosData = await getVideos(hostname, socialId[0])
  }

  const breadcrumbItems = [
    { title: "Social Media", href: "/admin/social-media" },
    { title: social?.title, href: "#" },
  ].map((item) => (
    <Link href={item.href} key={item.href}>
      {item.title}
    </Link>
  ))
  return (
    <div>
      <Breadcrumbs mb={20}>{breadcrumbItems}</Breadcrumbs>

      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 4, xl: 5 }}
        spacing={{ base: "md" }}
        verticalSpacing={{ base: "md" }}
      >
        {YoutubeVideosData.map((data) => (
          <YoutubeVideos video={data} key={data.id} />
        ))}
      </SimpleGrid>
    </div>
  )
}
