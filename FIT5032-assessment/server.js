import express from "express"
import sgMail from "@sendgrid/mail"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const app = express()
app.use(cors())
app.use(express.json())

app.post("/send-welcome-email", async (req, res) => {
  const { email } = req.body

  const msg = {
    to: email,
    from: "lintaixiang0917@gmail.com", 
    subject: "Welcome to Men's Health Project!",
    text: "Hi! Thanks for signing up. Hope you enjoy our project."
  }

  try {
    console.log("📨 Sending email to:", email)

  
    const result = await sgMail.send(msg)

    console.log("Email sent successfully,status code:", result[0].statusCode)
    res.send("Email sent!")
  } catch (err) {
    console.error("Failed to send email:", err)
    res.status(500).send("Failed to send email.")
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})