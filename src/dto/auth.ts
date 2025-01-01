export interface SendOTPRequest {
  email: string
}

export interface VerifyOTPRequest {
  email: string
  otp: number
}

export type SessionData = {
  email: string
  hostname: string
  expiresAt?: Date
}
