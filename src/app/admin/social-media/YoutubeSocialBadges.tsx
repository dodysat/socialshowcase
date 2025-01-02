"use client"
import BadgeStatistics from "@/components/BadgeStatistics"
import { Channel } from "@/dto/youtube"
import { useEffect, useState } from "react"
import { IconUsers, IconEye, IconVideo } from "@tabler/icons-react"
import { Flex, Loader } from "@mantine/core"

interface YoutubeSocialBadgesProps {
  readonly id: string
}

export default function YoutubeSocialBadges({ id }: YoutubeSocialBadgesProps) {
  const [channel, setChannel] = useState<Channel | null>(null)

  useEffect(() => {
    const fetchChannel = async () => {
      const response = await fetch(
        `/api/social/youtube/channel?channelId=${id}`
      )
      const data = await response.json()
      setChannel(data.channel)
    }

    fetchChannel()
  }, [id])

  return (
    <div>
      {channel ? (
        <div>
          <Flex justify="space-between" align="center" mt={5} gap={5}>
            <BadgeStatistics
              color="blue"
              count={channel?.statistics?.viewCount}
              icon={<IconEye size={16} />}
            />
            <BadgeStatistics
              color="violet"
              count={channel?.statistics?.subscriberCount}
              icon={<IconUsers size={16} />}
            />
            <BadgeStatistics
              color="green"
              count={channel?.statistics?.videoCount}
              icon={<IconVideo size={16} />}
            />
          </Flex>
        </div>
      ) : (
        <Loader color="blue" type="dots" />
      )}
    </div>
  )
}
