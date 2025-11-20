/**
 * Server-side email helper stub.
 * Replace the placeholders with real SendGrid or SMTP logic when deploying.
 */
export type EmailPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean }>{
  // In production, uncomment one of the strategies below and provide the required env vars.
  // Strategy A: SendGrid
  // const client = new SendGridClient(process.env.SENDGRID_API_KEY!);
  // await client.send({
  //   to: process.env.CONTACT_INBOX!,
  //   from: 'no-reply@guerrillasocial.club',
  //   subject: `New inquiry from ${payload.name}`,
  //   text: payload.message,
  // });

  // Strategy B: Nodemailer SMTP
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: Number(process.env.SMTP_PORT || 587),
  //   secure: false,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  // });
  // await transporter.sendMail({
  //   to: process.env.CONTACT_INBOX,
  //   from: process.env.SMTP_USER,
  //   subject: `New inquiry from ${payload.name}`,
  //   text: payload.message,
  // });

  // For now, mimic a successful response so the UI can provide feedback.
  console.info('[email stub] Pretending to send email for payload:', payload);
  await new Promise((resolve) => setTimeout(resolve, 750));
  return { success: true };
}
