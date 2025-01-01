interface SendOTPTemplateProps {
  otp: string
}

export const SendOTPTemplate = ({ otp }: SendOTPTemplateProps) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
      }
      .email-container {
        max-width: 600px;
        margin: 50px auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
      }
      .header {
        text-align: center;
        color: #333;
      }
      .otp {
        font-size: 24px;
        color: #007bff;
        font-weight: bold;
        margin: 20px 0;
        text-align: center;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #666;
      }
      .button {
        display: inline-block;
        margin: 20px auto;
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <p>Your OTP Code for verification is:</p>
      </div>
      <div class="otp">${otp}</div>
      <div class="footer">
        <p>If you did not request this, please ignore this email.</p>
        <p>&copy; ${new Date().getFullYear()}. All Rights Reserved.</p>
      </div>
    </div>
  </body>
  </html>
`
