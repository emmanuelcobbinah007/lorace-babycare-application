import { Resend } from 'resend';

const resend = new Resend('re_HzN7A3un_D4cCHTaTGD88WTPyEaVn6WnL');

const NEXT_PUBLIC_ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL || 'http://localhost:3000';

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${NEXT_PUBLIC_ROOT_URL}/verify-email?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: process.env.VERIFICATION_EMAIL_FROM || 'no-reply@yourdomain.com',
    to: email,
    subject: 'Verify your email address',
    html: `<p>Welcome To Lorace Babycare!</p><p>Please verify your email by clicking the link below:</p><a href="${verifyUrl}">Verify Email</a>`,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}