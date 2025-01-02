import { Hostname } from "@/helpers/hostname"
import redis from "@/redis"

export const isAllowedToSendOTP = async (email: string): Promise<boolean> => {
  const hostname = await Hostname()
  const isInitializing = await redis.exists(`${hostname}:isInitializing`)
  if (isInitializing === 1) {
    return true
  }
  const exist = await redis.exists(`${hostname}:account:${email}`)
  if (exist === 1) {
    return true
  }
  return false
}

export const deleteIsInitializing = async (): Promise<void> => {
  const hostname = await Hostname()
  await redis.del(`${hostname}:isInitializing`)
}

export const setOTP = async (email: string, otp: number): Promise<void> => {
  const hostname = await Hostname()
  const ttl = 2 * 60
  await redis.setex(`${hostname}:otp:${email}`, ttl, otp)
}

export const getOTP = async (email: string): Promise<number | null> => {
  const hostname = await Hostname()
  const otp: number | null = await redis.get(`${hostname}:otp:${email}`)
  return otp
}

export const deleteOTP = async (email: string): Promise<void> => {
  const hostname = await Hostname()
  await redis.del(`${hostname}:otp:${email}`)
}

export const setAccount = async (email: string): Promise<void> => {
  const hostname = await Hostname()
  await redis.set(`${hostname}:account:${email}`, "")
}
