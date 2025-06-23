import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { NotificationEmailTemplate } from '@/components/notification-email-template';
import { ConfirmationEmailTemplate } from '@/components/confirmation-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, company, phone, subject, message } = body;

    // Send notification email to you
    await resend.emails.send({
      from: 'noreply@atlas-digital-impact.com',
      to: ['contact@atlas-digital-impact.com'],
      subject: 'Nouvelle soumission du formulaire de contact',
      react: <NotificationEmailTemplate fullName={fullName} email={email} company={company} phone={phone} subject={subject} message={message} />,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'noreply@atlas-digital-impact.com',
      to: [email],
      subject: 'Merci de nous avoir contactés !',
      react: <ConfirmationEmailTemplate fullName={fullName} />,
    });

    return NextResponse.json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
