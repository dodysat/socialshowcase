import "server-only"

import { cookies } from "next/headers"
import { getIronSession } from "iron-session"

import { SessionData } from "@/dto/auth"

const sessionActiveForOneMonth = 60 * 60 * 24 * 30
const threeWeek = 60 * 60 * 24 * 21

const sessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    "This is a secret that should be stored in the environment variables.",
  cookieName: "sess-auth",
  ttl: sessionActiveForOneMonth,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
}

export const getSession = async (): Promise<SessionData> => {
  const sessionCookies = await cookies()
  const session = await getIronSession<SessionData>(
    sessionCookies,
    sessionOptions
  )
  return session
}

export const checkAndRefreshSession = async (): Promise<void> => {
  const sessionCookies = await cookies()
  const session = await getIronSession<SessionData>(
    sessionCookies,
    sessionOptions
  )
  if (session?.email) {
    if (session?.expiresAt) {
      const now = new Date()
      const expiresAt = new Date(session.expiresAt)
      const diff = expiresAt.getTime() - now.getTime()
      if (diff < threeWeek * 1000) {
        session.expiresAt = new Date(
          Date.now() + sessionActiveForOneMonth * 1000
        )
        await session.save().catch((error) => {
          console.error("Failed to save session:", error)
          throw new Error("Session could not be saved.")
        })
      }
    } else {
      session.expiresAt = new Date(Date.now() + sessionActiveForOneMonth * 1000)
      await session.save().catch((error) => {
        console.error("Failed to save session:", error)
        throw new Error("Session could not be saved.")
      })
    }
  }

  return
}

export const setSession = async (session: SessionData): Promise<void> => {
  const sessionCookies = await cookies()
  const setSession = await getIronSession<SessionData>(
    sessionCookies,
    sessionOptions
  )

  setSession.email = session.email
  setSession.hostname = session.hostname
  setSession.expiresAt = new Date(Date.now() + sessionActiveForOneMonth * 1000)

  await setSession.save().catch((error) => {
    console.error("Failed to save session:", error)
    throw new Error("Session could not be saved.")
  })
}

export const destroySession = async (): Promise<void> => {
  const sessionCookies = await cookies()
  const session = await getIronSession<SessionData>(
    sessionCookies,
    sessionOptions
  )
  session.destroy()
}
