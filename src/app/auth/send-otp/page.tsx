import { Suspense } from "react"
import SendOTP from "./SendOtp"

export default function SendOTPPage() {
  return (
    <Suspense>
      <SendOTP />
    </Suspense>
  )
}
