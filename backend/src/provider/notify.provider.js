import nodemailer from "nodemailer";

// Sends you an email when she answers.
// Falls back to a console log if email isn't configured.
export async function notify(message) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD, NOTIFY_TO } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.log(`🔔 (notify) ${message}`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      family: 4, // force IPv4 — Render can't reach Gmail over IPv6 (ENETUNREACH)
      connectionTimeout: 10000, // give up after 10s instead of hanging
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Date App 💖" <${GMAIL_USER}>`,
      to: NOTIFY_TO || GMAIL_USER,
      subject: "She answered! 💖",
      text: message,
    });
    console.log("📧 Notification email sent");
  } catch (err) {
    console.error("Failed to send email:", err.message);
  }
}
