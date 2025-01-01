"use client"
import { AddSocialRequest, SocialType } from "@/dto/social"
import {
  Text,
  Button,
  Modal,
  TextInput,
  Select,
  Flex,
  Avatar,
  Alert,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocalStorage } from "@mantine/hooks"
import { useState } from "react"
import { Channel } from "@/dto/youtube"

export default function AddSocialMedia() {
  const [modalAddSocial, setModalAddSocial] = useLocalStorage({
    key: "modalAddSocial",
    defaultValue: false,
  })

  const [stageCheck, setStageCheck] = useState(true)
  const [channel, setChannel] = useState<Channel | null>(null)

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const formCheck = useForm<AddSocialRequest>({
    initialValues: {
      type: SocialType.YOUTUBE,
      username: "",
    },
    validate: {
      username: (value) => {
        if (!value || value.trim().length === 0) {
          return "Username tidak boleh kosong"
        }
      },
      type: (value) => {
        if (!value) {
          return "Harus memilih jenis sosial media"
        } else if (!Object.values(SocialType).includes(value)) {
          return "Jenis sosial media tidak valid"
        }
      },
    },
  })

  const handleSubmitCheck = async () => {
    setLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch("/api/social/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formCheck.values),
      })

      const data = await response.json()
      if (!response.ok) {
        setErrorMessage(data?.error || "Terjadi Kesalahan")
        throw new Error("Terjadi Kesalahan")
      }

      setChannel(data)
      setStageCheck(false)
    } catch (error) {
      setErrorMessage("Terjadi Kesalahan")
      throw new Error(String(error))
    } finally {
      setLoading(false)
    }
  }

  const addSocial = async () => {
    setLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch("/api/social/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formCheck.values),
      })

      const data = await response.json()
      if (!response.ok) {
        setErrorMessage(data?.error || "Terjadi Kesalahan")
        throw new Error("Terjadi Kesalahan")
      }

      setModalAddSocial(false)
      // reload
      window.location.reload()
    } catch (error) {
      setErrorMessage("Terjadi Kesalahan")
      throw new Error(String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Modal
        opened={modalAddSocial}
        onClose={() => setModalAddSocial(false)}
        title="Tambah Sosial Media"
      >
        <Alert
          variant="outline"
          color="red"
          title="Gagal"
          my="sm"
          hidden={!errorMessage}
        >
          {errorMessage}
        </Alert>
        <form
          onSubmit={formCheck.onSubmit(handleSubmitCheck)}
          className="flex-grow overflow-auto"
          style={{ display: stageCheck ? "block" : "none" }}
        >
          <Select
            label="Pilih jenis sosial media"
            placeholder=""
            key={formCheck.key("type")}
            {...formCheck.getInputProps("type")}
            data={[
              { value: SocialType.YOUTUBE, label: "YouTube" },
              { value: SocialType.INSTAGRAM, label: "Instagram" },
              { value: SocialType.TIKTOK, label: "TikTok" },
            ]}
          />

          <TextInput
            label="Username"
            withAsterisk
            placeholder="Masukkan username"
            type="text"
            mt="md"
            key={formCheck.key("username")}
            {...formCheck.getInputProps("username")}
          />

          <Flex mt="md" justify="right" align="center">
            <Button
              type="submit"
              loading={loading}
              disabled={loading || !formCheck.isValid}
              mt="md"
            >
              Periksa
            </Button>
          </Flex>
        </form>

        <div style={{ display: stageCheck ? "none" : "block" }}>
          {channel && (
            <div>
              <Flex justify="center">
                <div>
                  <Avatar
                    src={channel.snippet.thumbnails.high.url}
                    alt={channel.snippet.title}
                    size={200}
                  />
                  <Flex justify="center">
                    <Text size="md" fw={500} my={10}>
                      {channel.snippet.title}
                    </Text>
                  </Flex>
                </div>
              </Flex>

              <Text size="sm">{channel.snippet.description}</Text>
            </div>
          )}

          <Flex mt="md" justify="space-between" align="center">
            <Button
              variant="subtle"
              color="gray"
              type="button"
              onClick={() => {
                setStageCheck(true)
                setChannel(null)
              }}
            >
              Kembali
            </Button>

            <Button
              color="blue"
              radius="md"
              onClick={() => {
                addSocial()
              }}
              disabled={loading}
              loading={loading}
            >
              Simpan
            </Button>
          </Flex>
        </div>
      </Modal>
    </div>
  )
}
