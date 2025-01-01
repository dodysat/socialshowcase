import Image from "next/image"
import React from "react"

interface SocialCardProps {
  name: string
  logoPath: string
}

const SocialCard: React.FC<SocialCardProps> = ({ name, logoPath }) => {
  return (
    <div className="card bg-base-100 shadow-none">
      <div className="card-body">
        <Image src={logoPath} alt={name} width={96} height={96} />
        <h2 className="card-title text-xl">120K</h2>
      </div>
    </div>
  )
}

export default SocialCard
