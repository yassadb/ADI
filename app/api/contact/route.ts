import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';

const resend = new Resend(process.env.RESEND_API_KEY);
const submissionsFilePath = 'contact-form-submissions.json';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, message } = body;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Atlas Digital Impact <onboarding@resend.dev>',
      to: ['contact@atlas-digital-impact.com'],
      subject: 'New Contact Form Submission',
      html: `<p><strong>Name:</strong> ${fullName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    // Save submission to file
    let submissions = [];
    try {
      const fileContent = fs.readFileSync(submissionsFilePath, 'utf-8');
      submissions = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is empty, ignore
    }

    submissions.push({
      fullName,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    fs.writeFileSync(submissionsFilePath, JSON.stringify(submissions, null, 2));

    return NextResponse.json({ message: 'Email sent and submission saved!', data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
