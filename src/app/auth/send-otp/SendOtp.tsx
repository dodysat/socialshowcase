"use client"
import { SendOTPRequest } from "@/dto/auth"

import {
  Card,
  Text,
  Button,
  Group,
  TextInput,
  Flex,
  Alert,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SendOTP() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  const form = useForm<SendOTPRequest>({
    initialValues: {
      email: email ?? "",
    },
    validate: {
      email: (value) => {
        if (!value || value.trim().length === 0) {
          return "Email tidak boleh kosong"
        } else if (!regexEmail.test(value)) {
          return "Email tidak valid"
        }
      },
    },
  })

  const handleSubmit = async () => {
    setLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.values),
      })

      const data = await response.json()
      if (!response.ok) {
        setErrorMessage(data?.error || "Gagal mengirim OTP")
        throw new Error("Gagal mengirim OTP")
      }

      router.push(`/auth/verify?email=${form.values.email}`)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ width: 318 }}
      >
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Login untuk melanjutkan</Text>
        </Group>

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
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex-grow overflow-auto"
        >
          <TextInput
            label="Email"
            withAsterisk
            placeholder="Masukkan email"
            type="text"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <Flex mt="md" justify="space-between" align="center">
            <Button
              variant="subtle"
              color="gray"
              type="button"
              onClick={() => {
                router.push("/")
              }}
            >
              Kembali
            </Button>

            <Button
              color="blue"
              radius="md"
              type="submit"
              disabled={loading || !form.isValid}
              loading={loading}
            >
              Kirim OTP
            </Button>
          </Flex>
        </form>
      </Card>
    </div>
  )
}
