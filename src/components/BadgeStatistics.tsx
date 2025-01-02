"use client"
import { Badge, Flex, Tooltip } from "@mantine/core"

const countConverter = (count: string) => {
  const countNumber = parseInt(count)
  if (countNumber > 1000000000) {
    return `${(countNumber / 1000000000).toFixed(1)}B`
  } else if (countNumber > 1000000) {
    return `${(countNumber / 1000000).toFixed(1)}M`
  } else if (countNumber > 1000) {
    return `${(countNumber / 1000).toFixed(1)}K`
  } else {
    return count
  }
}

const numberSeparation = (count: string) => {
  return count.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

interface BadgeStatisticsProps {
  readonly count: string
  readonly icon: React.ReactNode
  readonly color: string
}

export default function BadgeStatistics({
  count,
  icon,
  color,
}: BadgeStatisticsProps) {
  return (
    <div>
      <Tooltip label={numberSeparation(count)} position="bottom">
        <Badge variant="outline" color={color} radius="md" mt={5} px={3}>
          <Flex align="center" gap={2}>
            {icon}
            {countConverter(count)}
          </Flex>
        </Badge>
      </Tooltip>
    </div>
  )
}
