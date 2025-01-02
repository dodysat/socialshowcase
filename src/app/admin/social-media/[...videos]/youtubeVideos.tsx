"use client"
import { Video } from "@/dto/youtube"
import { BackgroundImage, Card, Flex, Text, Tooltip } from "@mantine/core"

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

  const parseYouTubeDuration = (duration: string) => {
    // Regular expression to match ISO 8601 duration components
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    const matches = regex.exec(duration)

    // Extract hours, minutes, and seconds (convert undefined matches to 0)
    const hours = parseInt(matches?.[1] || "0", 10)
    const minutes = parseInt(matches?.[2] || "0", 10)
    const seconds = parseInt(matches?.[3] || "0", 10)

    // Convert the duration to total seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds

    return {
      hours,
      minutes,
      seconds,
      totalSeconds,
      formatted: `${hours > 0 ? hours + ":" : ""}${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`,
    }
  }

  return (
    <div>
      <Card key={video.id} padding="none" radius="md" bg="transparent">
        <div
          style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}
        >
          <BackgroundImage
            src={video.snippet.thumbnails.maxres.url}
            h="100%"
            radius="md"
            onClick={() => openVideo(video)}
          >
            <Flex justify="right" align="center" mt={5} mr={5}>
              <BadgeStatistics
                color="red"
                count={
                  parseYouTubeDuration(video.contentDetails.duration).formatted
                }
                isNotUsingTooltip={true}
                variant="filled"
              />
            </Flex>
          </BackgroundImage>
        </div>
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
            isNotUsingTooltip={true}
          />
        </Flex>

        <TimeStamp time={video.snippet.publishedAt} />

        <Tooltip label={video.snippet.title}>
          <Text truncate="end" fw={500} mt={2} onClick={() => openVideo(video)}>
            {video.snippet.title}
          </Text>
        </Tooltip>
      </Card>
    </div>
  )
}
