"use client"
import { Text } from "@mantine/core"

const timeFormatter = (time: string) => {
  const date = new Date(time)
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date)
  const day = date.getDate()
  const year = date.getFullYear()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${day} ${month} ${year} ${hour}:${minute}:${second}`
}

interface TimeStampProps {
  readonly time: string
}

export default function TimeStamp({ time }: TimeStampProps) {
  return (
    <div>
      <Text c="dimmed" size="xs">
        {timeFormatter(time)}
      </Text>
    </div>
  )
}
