import { Resend } from "resend";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY in environment variables.");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const resend = new Resend(resendApiKey);

    const response = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // using Resend's test sender
      to: "heinn2004@gmail.com",
      subject: `New Contact from ${name}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
      reply_to: email, // Set reply_to so the user can reply directly
    });

    if (response.error) {
      console.error("Resend API Error:", response.error);
      return res.status(500).json({ error: response.error.message });
    }

    res.status(200).json({ success: true, data: response.data });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to send email";
    res.status(500).json({ error: errorMessage });
  }
}
