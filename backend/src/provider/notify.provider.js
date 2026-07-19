import nodemailer from "nodemailer";

export async function notify(message) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD, NOTIFY_TO } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.log(`🔔 (notify) ${message}`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
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
  } catch (err) {
    console.error("Failed to send email:", err.message);
  }
}
