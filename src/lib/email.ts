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
    clientPhone?: string;
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
        clientPhone,
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
              ${clientPhone ? `<p style="margin:8px 0 0 0; font-size:13px; color:#71717a;">📱 ${clientPhone}</p>` : ''}
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
${clientPhone ? `Phone: ${clientPhone}` : ''}
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

export interface EnquiryEmailParams {
    name: string;
    contact: string;
    building: string;
    stage: string;
    budget: string;
    launchDate: string;
    source?: string;
    supportNeeded?: string;
    engagement?: string;
    timezone?: string;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export async function sendEnquiryNotification(params: EnquiryEmailParams) {
    const name = escapeHtml(params.name.trim());
    const contact = escapeHtml(params.contact.trim());
    const building = escapeHtml(params.building.trim());
    const stage = escapeHtml(params.stage.trim());
    const budget = escapeHtml(params.budget.trim());
    const launchDate = escapeHtml(params.launchDate.trim());
    const source = escapeHtml((params.source || 'saas-mvp-development').trim());
    const supportNeeded = params.supportNeeded
        ? escapeHtml(params.supportNeeded.trim())
        : "";
    const engagement = params.engagement ? escapeHtml(params.engagement.trim()) : "";
    const timezone = params.timezone ? escapeHtml(params.timezone.trim()) : "";
    const isContact = (params.source || "").trim() === "contact";

    const to = process.env.ENQUIRY_TO_EMAIL || process.env.GOOGLE_CALENDAR_ID || 'somnathkhadanga@gmail.com';

    const extraRows = [
        supportNeeded
            ? `<tr>
            <td style="padding:0 0 12px 0;">
              <p style="margin:0 0 4px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">Support needed</p>
              <p style="margin:0; font-size:15px; color:#ffffff;">${supportNeeded}</p>
            </td>
          </tr>`
            : "",
        engagement
            ? `<tr>
            <td style="padding:0 0 12px 0;">
              <p style="margin:0 0 4px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">Preferred engagement</p>
              <p style="margin:0; font-size:15px; color:#ffffff;">${engagement}</p>
            </td>
          </tr>`
            : "",
        timezone
            ? `<tr>
            <td style="padding:0 0 12px 0;">
              <p style="margin:0 0 4px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">Country / time zone</p>
              <p style="margin:0; font-size:15px; color:#ffffff;">${timezone}</p>
            </td>
          </tr>`
            : "",
    ].join("");

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
            <td style="padding:0 0 24px 0;">
              <p style="margin:0; font-size:13px; color:#52525b; letter-spacing:2px; text-transform:uppercase;">SOMANATH STUDIO</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 8px 0;">
              <h1 style="margin:0; font-size:24px; font-weight:700; color:#ffffff;">${isContact ? "New contact enquiry" : "New MVP project enquiry"}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 28px 0;">
              <p style="margin:0; font-size:14px; color:#a1a1aa;">Source: ${source}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 12px 0;">
              <p style="margin:0 0 4px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">Name</p>
              <p style="margin:0; font-size:15px; color:#ffffff;">${name}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 12px 0;">
              <p style="margin:0 0 4px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">Email / WhatsApp</p>
              <p style="margin:0; font-size:15px; color:#ffffff;">${contact}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 12px 0;">
              <p style="margin:0 0 4px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">What are they building?</p>
              <p style="margin:0; font-size:15px; color:#a1a1aa; line-height:1.6;">${building}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 12px 0;">
              <p style="margin:0 0 4px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">${isContact ? "New or existing" : "Current stage"}</p>
              <p style="margin:0; font-size:15px; color:#ffffff;">${stage}</p>
            </td>
          </tr>
          ${extraRows}
          <tr>
            <td style="padding:0 0 12px 0;">
              <p style="margin:0 0 4px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">Approximate budget</p>
              <p style="margin:0; font-size:15px; color:#ffffff;">${budget}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 12px 0;">
              <p style="margin:0 0 4px 0; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#71717a;">${isContact ? "Desired timeline" : "Expected launch date"}</p>
              <p style="margin:0; font-size:15px; color:#ffffff;">${launchDate}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const text = `
${isContact ? "New contact enquiry" : "New MVP project enquiry"}

Name: ${params.name}
Contact: ${params.contact}
Building: ${params.building}
Stage: ${params.stage}
${params.supportNeeded ? `Support needed: ${params.supportNeeded}` : ""}
${params.engagement ? `Engagement: ${params.engagement}` : ""}
${params.timezone ? `Timezone: ${params.timezone}` : ""}
Budget: ${params.budget}
Launch date: ${params.launchDate}
Source: ${params.source || 'saas-mvp-development'}
`.trim();

    return transporter.sendMail({
        from: `"Somanath Studio" <${process.env.SES_FROM_EMAIL || 'dev@somanathkhadanga.com'}>`,
        to,
        replyTo: params.contact.includes('@') ? params.contact.trim() : undefined,
        subject: `${isContact ? "Contact" : "MVP"} enquiry: ${params.name.trim()}`,
        html,
        text,
    });
}
