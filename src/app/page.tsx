import SocialCard from "@/components/SocialCard"
import { Flex } from "@mantine/core"

export default async function Home() {
  return (
    <div>
      <Flex gap="lg" direction="row" justify="center">
        <SocialCard
          name="Instagram"
          logoPath="/logos/instagram.svg"
          subsCount={1276}
        />
        <SocialCard
          name="Tiktok"
          logoPath="/logos/tiktok.svg"
          subsCount={16254}
        />
        <SocialCard
          name="Youtube"
          logoPath="/logos/youtube.svg"
          subsCount={500}
        />
      </Flex>
    </div>
  )
}
