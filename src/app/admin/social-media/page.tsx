"use client"
import {
  Card,
  Text,
  Button,
  Modal,
  SimpleGrid,
  Input,
  Flex,
  Avatar,
  Badge,
} from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import Add from "./add"
import { useEffect, useState } from "react"
import { Social } from "@/dto/social"
import Image from "next/image"

export default function SocialMedia() {
  const [modalAddSocial, setModalAddSocial] = useLocalStorage({
    key: "modalAddSocial",
    defaultValue: false,
  })

  const [socials, setSocials] = useState<Social[]>([])
  const [loading, setLoading] = useState(false)

  // fetch api to get socials
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/social/list")
        const data = await response.json()
        setSocials(data)
        setLoading(false)
        console.log("Data fetched:", data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const openSocial = (social: Social) => {
    if (social.type === "YOUTUBE") {
      window.open(`https://www.youtube.com/${social.username}`)
    }

    if (social.type === "INSTAGRAM") {
      window.open(`https://www.instagram.com/${social.username}`)
    }

    if (social.type === "TIKTOK") {
      window.open(`https://www.tiktok.com/@${social.username}`)
    }
  }

  return (
    <div>
      <Add />

      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 4, xl: 5 }}
        spacing={{ base: "md" }}
        verticalSpacing={{ base: "md" }}
      >
        {socials.map((social) => (
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
                    openSocial(social)
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

            <Button color="blue" fullWidth mt="md" radius="md">
              Detail
            </Button>
          </Card>
        ))}

        <Card shadow="none" padding="lg" radius="none" withBorder={false}>
          <Button
            color="blue"
            m="auto"
            radius="md"
            fullWidth={false}
            style={{ width: "92px" }}
            onClick={() => setModalAddSocial(true)}
          >
            Tambah
          </Button>
        </Card>
      </SimpleGrid>
    </div>
  )
}
