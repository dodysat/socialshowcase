import { SessionData } from "@/dto/auth"
import { Hostname } from "@/helpers/hostname"
import { setSession } from "@/helpers/session"
import {
  deleteIsInitializing,
  deleteOTP,
  getOTP,
  setAccount,
} from "@/repository/user"

export async function POST(req: Request): Promise<Response> {
  const body: { email: string; otp: string } = await req.json()

  if (!body.email || !body.otp) {
    return new Response(
      JSON.stringify({ error: "Harus mengisi Email dan OTP" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const otpExist = await getOTP(body.email)

  if (!otpExist) {
    return new Response(
      JSON.stringify({
        error: "Silahkan kirim ulang OTP",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const otpExistString = otpExist.toString()
  if (body.otp !== otpExistString) {
    return new Response(JSON.stringify({ error: "OTP tidak valid" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  await deleteIsInitializing()
  await deleteOTP(body.email)
  await setAccount(body.email)

  const hostname = await Hostname()
  const sessionData: SessionData = {
    email: body.email,
    hostname: hostname,
  }
  await setSession(sessionData)

  return new Response(JSON.stringify({ message: "Berhasil verifikasi OTP" }))
}
