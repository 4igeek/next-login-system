import sgMail, { MailDataRequired } from "@sendgrid/mail";

// Initialize SendGrid with API key
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is not set in environment variables");
}

if (!process.env.SENDGRID_FROM_EMAIL) {
  throw new Error("SENDGRID_FROM_EMAIL is not set in environment variables");
}

if (!process.env.SENDGRID_FROM) {
  throw new Error("SENDGRID_FROM is not set in environment variables");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
        email: process.env.SENDGRID_FROM_EMAIL as string,
        name: process.env.SENDGRID_FROM as string,
      },
      subject,
      text: text || "",
      html: html || "",
    };

    const response = await sgMail.send(msg);
    return { success: true, response };
  } catch (error: any) {
    console.error("Error sending email:", {
      message: error.message,
      code: error.code,
      response: error.response?.body,
    });
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        details: error.response?.body,
      },
    };
  }
}
