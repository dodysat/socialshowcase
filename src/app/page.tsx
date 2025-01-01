import { Instance } from "@/dto/instance"
import { redirect } from "next/navigation"

import redis from "@/redis"
import { headers } from "next/headers"

export default async function Home() {
  let currentHost = (await headers()).get("host")
  if (!currentHost) {
    throw new Error("Host header is missing")
  }

  const key = `instance:${currentHost}`

  const checkExist = async (key: string) => {
    try {
      const exists = await redis.exists(key)
      return exists
    } catch (error) {
      console.error("Error checking if key exists:", error)
      return false
    }
  }

  const storeInstance = async (key: string, data: Instance) => {
    try {
      await redis.set(key, JSON.stringify(data))
      console.log(`Data stored for key: ${key}`)
    } catch (error) {
      console.error("Error storing JSON data:", error)
    }
  }
  const getInstanceData = async (key: string): Promise<Instance | null> => {
    try {
      const data = await redis.get(key)
      if (data === null) {
        return null
      }
      return data as Instance
    } catch (error) {
      console.error("Error retrieving JSON data:", error)
      return null
    }
  }

  const instanceExists = await checkExist(key)
  if (!instanceExists) {
    console.log("Instance does not exist")
    const instanceData: Instance = {
      host: currentHost,
      isRegistered: false,
    }
    await storeInstance(key, instanceData)
  }

  const instanceData = await getInstanceData(key)
  if (!instanceData) {
    throw new Error("Failed to get instance data")
  }

  if (!instanceData.isRegistered) {
    console.log("Redirect to registration")
    redirect("https://socialshowcase.id/register")
  }

  return (
    <div>
      <h1>Instance</h1>
      <h2>Host: {instanceData?.host}</h2>
    </div>
  )
}
