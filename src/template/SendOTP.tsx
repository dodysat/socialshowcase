import * as React from "react"

interface SendOTPTemplateProps {
  firstName: string
}

export const SendOTPTemplate: React.FC<Readonly<SendOTPTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
)
