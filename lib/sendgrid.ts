import sgMail, { MailDataRequired } from "@sendgrid/mail";

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    const msg: MailDataRequired = {
      to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: process.env.SENDGRID_FROM!,
      },
      subject,
      text: text || "",
      html: html || "",
    };

    const response = await sgMail.send(msg);
    return { success: true, response };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
