import nodemailer from 'nodemailer';

// SES SMTP transport — credentials set in Vercel env vars
const transporter = nodemailer.createTransport({
    host: `email-smtp.${process.env.AWS_SES_REGION || 'ap-south-1'}.amazonaws.com`,
    port: 587,
    secure: false, // STARTTLS on port 587
    auth: {
        user: process.env.SES_SMTP_USER,
        pass: process.env.SES_SMTP_PASS,
    },
});

export interface BookingEmailParams {
    clientName: string;
    clientEmail: string;
    startTime: Date;
    endTime: Date;
    meetLink?: string;
    timezone?: string;
    projectDetails?: string;
}

function formatDateTime(date: Date, timezone?: string): string {
    return date.toLocaleString('en-US', {
        timeZone: timezone || 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
    });
}

export async function sendBookingConfirmation(params: BookingEmailParams) {
    const {
        clientName,
        clientEmail,
        startTime,
        endTime,
        meetLink,
        timezone,
        projectDetails,
    } = params;

    const formattedStart = formatDateTime(startTime, timezone);
    const formattedEnd = endTime.toLocaleString('en-US', {
        timeZone: timezone || 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
    });

    const meetSection = meetLink
        ? `
        <tr>
          <td style="padding: 0 0 28px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:#18181b; border:1px solid #27272a; border-radius:10px; padding:20px 24px;">
                  <p style="margin:0 0 8px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">Google Meet Link</p>
                  <a href="${meetLink}" style="font-size:15px; color:#22d3ee; text-decoration:none; word-break:break-all;">${meetLink}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>`
        : '';

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#09090b; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#09090b; padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <tr>
            <td style="padding:0 0 32px 0;">
              <p style="margin:0; font-size:13px; color:#52525b; letter-spacing:2px; text-transform:uppercase;">SOMANATH STUDIO</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 0 8px 0;">
              <h1 style="margin:0; font-size:28px; font-weight:700; color:#ffffff; line-height:1.2;">Your call is confirmed</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 32px 0;">
              <p style="margin:0; font-size:16px; color:#a1a1aa; line-height:1.6;">Hi ${clientName}, looking forward to talking through your project.</p>
            </td>
          </tr>

          <tr><td style="border-top:1px solid #27272a; padding:0 0 28px 0;"></td></tr>

          <tr>
            <td style="padding:0 0 28px 0;">
              <p style="margin:0 0 6px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">Date &amp; Time</p>
              <p style="margin:0; font-size:16px; color:#ffffff; font-weight:500;">${formattedStart}</p>
              <p style="margin:4px 0 0 0; font-size:14px; color:#a1a1aa;">until ${formattedEnd}</p>
            </td>
          </tr>

          ${meetSection}

          ${projectDetails ? `
          <tr>
            <td style="padding:0 0 28px 0;">
              <p style="margin:0 0 6px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">Your Notes</p>
              <p style="margin:0; font-size:15px; color:#a1a1aa; line-height:1.6;">${projectDetails}</p>
            </td>
          </tr>` : ''}

          <tr><td style="border-top:1px solid #27272a; padding:0 0 24px 0;"></td></tr>

          <tr>
            <td style="padding:0 0 40px 0;">
              <p style="margin:0; font-size:14px; color:#52525b; line-height:1.6;">Need to reschedule? Reply to this email and I'll sort it out.</p>
            </td>
          </tr>

          <tr>
            <td>
              <p style="margin:0; font-size:13px; color:#3f3f46;">somanathkhadanga.com</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const text = `
Your call is confirmed — Somanath Studio

Hi ${clientName},

Your 20-minute strategy call is booked.

Date & Time: ${formattedStart} – ${formattedEnd}
${meetLink ? `Google Meet: ${meetLink}` : ''}
${projectDetails ? `\nYour notes: ${projectDetails}` : ''}

Need to reschedule? Reply to this email.

somanathkhadanga.com
`.trim();

    return transporter.sendMail({
        from: `"Somanath Studio" <${process.env.SES_FROM_EMAIL || 'dev@somanathkhadanga.com'}>`,
        to: clientEmail,
        subject: `Confirmed: Strategy call with Somanath — ${startTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`,
        html,
        text,
    });
}
