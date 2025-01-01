import { Instance } from "@/dto/instance"
import { redirect } from "next/navigation"

import redis from "@/redis"
import { headers } from "next/headers"

export default async function Home() {
  return (
    <div>
      <h1>Instance</h1>
    </div>
  )
}
