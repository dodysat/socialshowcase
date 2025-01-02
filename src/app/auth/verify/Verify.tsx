"use client"
import { VerifyOTPRequest } from "@/dto/auth"
import { Card, Text, Button, Group, Flex, PinInput, Alert } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useSearchParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"

import { useState } from "react"

export default function Verify() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get("email")

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm<VerifyOTPRequest>({
    initialValues: {
      otp: 0,
      email: email ?? "",
    },
    validate: {
      otp: (value) => {
        if (!value || value.toString().length === 0) {
          return "OTP tidak boleh kosong"
        } else if (value.toString().length !== 6) {
          return "OTP harus 6 digit"
        }
      },
    },
  })

  const handleSubmit = async () => {
    setLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.values),
      })

      const data = await response.json()
      if (!response.ok) {
        setErrorMessage(data?.error || "Gagal verifikasi OTP")
        throw new Error("Gagal verifikasi OTP")
      }

      router.push("/admin/dashboard")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const back = () => {
    router.push(`/auth/send-otp?email=${email}`)
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
          <Text fw={500}>Verifikasi untuk melanjutkan</Text>
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
          <Text size="md" mb="md">
            Masukkan OTP yang sudah dikirim ke {email}{" "}
            <button
              type="button"
              onClick={back}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {" "}
              Kirim ulang
            </button>
          </Text>
          <PinInput
            length={6}
            type="number"
            key={form.key("otp")}
            {...form.getInputProps("otp")}
          />

          <Flex mt="md" justify="space-between" align="center">
            <Button
              variant="subtle"
              color="gray"
              type="button"
              onClick={() => {
                back()
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
              Verifikasi
            </Button>
          </Flex>
        </form>
      </Card>
    </div>
  )
}
