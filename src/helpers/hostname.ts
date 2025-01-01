import { headers } from "next/headers"

export const Hostname = async (): Promise<string> => {
  let currentHost = (await headers()).get("host")
  if (!currentHost) {
    throw new Error("Host header is missing")
  }

  let parsedUrl: string
  try {
    if (!currentHost.startsWith("http")) {
      currentHost = `http://${currentHost}`
    }

    const parse = new URL(currentHost)
    parsedUrl = parse.hostname
  } catch (error) {
    console.error("Error parsing hostname", error)
    throw new Error("URL tidak valid")
  }
  return parsedUrl
}
