import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getRecipients = () =>
  (process.env.CONTACT_EMAIL_TO ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

const stripLineBreaks = (value: string) => value.replace(/[\r\n]+/g, " ");

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please complete the form with valid details." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = getRecipients();

  if (!apiKey || !from || to.length === 0) {
    return NextResponse.json(
      { error: "Contact email is not configured." },
      { status: 500 },
    );
  }

  const { name, email, message } = parsed.data;
  const subjectPrefix = process.env.CONTACT_EMAIL_SUBJECT_PREFIX ?? "Portfolio";
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `${subjectPrefix}: New message from ${stripLineBreaks(name)}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: -apple-system, Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
  <div style="padding: 24px 0; border-bottom: 2px solid #f0f0f0;">
    <h2 style="margin: 0; font-size: 20px;">New enquiry from your portfolio</h2>
  </div>

  <p style="margin: 24px 0 8px; font-size: 15px; color: #555;">
    You've got a new message from <strong>${escapedName}</strong>:
  </p>

  <div style="background: #f9f9f9; border-radius: 8px; padding: 16px 20px; margin: 12px 0 24px;">
    <p style="margin: 0; white-space: pre-wrap;">${escapedMessage}</p>
  </div>

  <p style="font-size: 14px; color: #555;">
    <strong>${escapedName}</strong> can be reached at
    <a href="mailto:${escapedEmail}" style="color: #1a1a1a;">${escapedEmail}</a>
    if you'd like to follow up.
  </p>

  <p style="margin-top: 32px; font-size: 13px; color: #aaa;">
    Sent from your portfolio contact form.
  </p>
</div>
      `,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Resend contact email failed:", details);

    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
