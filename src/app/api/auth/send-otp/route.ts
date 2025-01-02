import { randomNumber } from "@/helpers/utils"
import { getOTP, isAllowedToSendOTP, setOTP } from "@/repository/user"
import { SendOTPTemplate } from "@/template/SendOTP"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request): Promise<Response> {
  const body: { email: string } = await req.json()

  if (!body.email) {
    return new Response(JSON.stringify({ error: "Harus mengisi Email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const allowedToSendOTP = await isAllowedToSendOTP(body.email)

  if (!allowedToSendOTP) {
    return new Response(JSON.stringify({ error: "Email tidak terdaftar" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const otpExist = await getOTP(body.email)
  if (otpExist) {
    return new Response(
      JSON.stringify({
        error: "Anda sudah mengirim OTP, tunggu beberapa saat",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const otp = randomNumber(6)

  await setOTP(body.email, otp)

  try {
    const { error } = await resend.emails.send({
      from: "OTP Social Showcase <noreply@m.socialshowcase.my.id>",
      to: [body.email],
      subject: "Login to Social Showcase",
      html: SendOTPTemplate({ otp: otp.toString() }),
    })

    if (error) {
      return Response.json({ error: "Terjadi kesalahan" }, { status: 500 })
    }

    return Response.json({ message: "Berhasil mengirim OTP" })
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Terjadi kesalahan" }, { status: 500 })
  }
}
