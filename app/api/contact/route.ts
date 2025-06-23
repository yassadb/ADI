import { Resend } from 'resend';

const resend = new Resend('re_4U2aNi11_MQDxSSGmpn8PJmJynjHA8ZFA');

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'contact@atlas-digital-impact.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
