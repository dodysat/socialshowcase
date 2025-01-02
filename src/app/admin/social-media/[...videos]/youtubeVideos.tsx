"use client"
import { Video } from "@/dto/youtube"
import { Card, Flex, Image, Text } from "@mantine/core"

import {
  IconThumbUp,
  IconEye,
  IconMessage,
  IconPercentage,
} from "@tabler/icons-react"
import TimeStamp from "./TimeStamp"
import BadgeStatistics from "@/components/BadgeStatistics"

const openVideo = (video: Video) => {
  // open new tab
  window.open(`https://www.youtube.com/watch?v=${video.id}`)
}

export default function YoutubeVideos({ video }: { readonly video: Video }) {
  const engagementRate = (
    ((parseInt(video.statistics.likeCount) +
      parseInt(video.statistics.commentCount)) /
      parseInt(video.statistics.viewCount)) *
    100
  ).toFixed(2)

  return (
    <div>
      <Card key={video.id} padding="none" radius="md">
        <Image
          src={video.snippet.thumbnails.maxres.url}
          alt={video.snippet.title}
          h="180"
          w="auto"
          fit="scale-down"
          radius="md"
          onClick={() => openVideo(video)}
        />
        <Flex justify="left" align="center" mt={5} gap={5}>
          <BadgeStatistics
            color="blue"
            count={video.statistics.viewCount}
            icon={<IconEye size={16} />}
          />
          <BadgeStatistics
            color="violet"
            count={video.statistics.likeCount}
            icon={<IconThumbUp size={16} />}
          />
          <BadgeStatistics
            color="green"
            count={video.statistics.commentCount}
            icon={<IconMessage size={16} />}
          />

          <BadgeStatistics
            color="red"
            count={engagementRate}
            icon={<IconPercentage size={16} />}
          />
        </Flex>

        <TimeStamp time={video.snippet.publishedAt} />

        <Text truncate="end" fw={500} mt={2} onClick={() => openVideo(video)}>
          {video.snippet.title}
        </Text>
      </Card>
    </div>
  )
}
