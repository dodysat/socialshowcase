"use client"
import { Social, SocialType } from "@/dto/social"
import { Button, Card, Flex, Text } from "@mantine/core"

export default function SocialCard({ social }: { readonly social: Social }) {
  const openSocial = (social: Social) => {
    if (social.type === SocialType.YOUTUBE) {
      window.open(`https://www.youtube.com/${social.username}`)
    }

    if (social.type === SocialType.INSTAGRAM) {
      window.open(`https://www.instagram.com/${social.username}`)
    }

    if (social.type === SocialType.TIKTOK) {
      window.open(`https://www.tiktok.com/@${social.username}`)
    }
  }

  return (
    <div>
      {social && (
        <Card key={social.id} shadow="sm" padding="lg" radius="md" withBorder>
          <Flex justify="center">
            <img
              src={social.thumbnails}
              alt={social.title}
              width={200}
              height={200}
              style={{ borderRadius: "100%" }}
            />
          </Flex>
          <Flex justify="center" mt="md">
            {social.type === "YOUTUBE" && (
              <Button
                color="#FF0000"
                size="xs"
                onClick={() => {
                  // openSocial(social)
                }}
              >
                {social.type}
              </Button>
            )}

            {social.type === "INSTAGRAM" && (
              <Button
                color="#5b51d8"
                size="xs"
                onClick={() => {
                  openSocial(social)
                }}
              >
                {social.type}
              </Button>
            )}

            {social.type === "TIKTOK" && (
              <Button
                color="#ff0050"
                size="xs"
                onClick={() => {
                  openSocial(social)
                }}
              >
                {social.type}
              </Button>
            )}
          </Flex>

          <Flex justify="center">
            <Text size="md" fw={500} my={10}>
              {social.title} - {social.username}
            </Text>
          </Flex>
          {/* <Text size="sm">{social.description}</Text> */}
        </Card>
      )}
    </div>
  )
}
