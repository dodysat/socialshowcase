import { Flex, Title } from "@mantine/core"
import Image from "next/image"
import React from "react"

interface SocialCardProps {
  name: string
  logoPath: string
  subsCount: number
}

const SocialCard: React.FC<SocialCardProps> = ({
  name,
  logoPath,
  subsCount,
}) => {
  let subs = subsCount.toString()

  if (subsCount && subsCount >= 1000) {
    subs = (subsCount / 1000).toFixed(2).replace(".", ",") + "K"
  }

  if (subsCount && subsCount >= 1000000) {
    subs = (subsCount / 1000000).toFixed(2).replace(".", ",") + "M"
  }

  if (subsCount && subsCount >= 1000000000) {
    subs = (subsCount / 1000000000).toFixed(2).replace(".", ",") + "B"
  }

  return (
    <div className="bg-base-100 shadow-none">
      <Image src={logoPath} alt={name} width={96} height={96} />
      <Flex justify="center">
        <Title order={2}>{subs}</Title>
      </Flex>
    </div>
  )
}

export default SocialCard
