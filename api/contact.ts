import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, _gotcha } = req.body || {};

    // Honeypot check for bots
    if (_gotcha) {
      return res
        .status(200)
        .json({ success: true, message: 'Message sent successfully' });
    }

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: 'Name, email, and message are required.' });
    }

    // SMTP Configuration from Vercel Environment Variables
    const user = process.env.MAIL_USERNAME || 'shivangisingh8688@gmail.com';
    const pass = process.env.MAIL_PASSWORD;
    const host = process.env.MAIL_SERVER || 'smtp.gmail.com';
    const port = Number(process.env.MAIL_PORT) || 587;
    const recipient = process.env.MAIL_RECIPIENT || user;

    if (!pass) {
      console.warn('MAIL_PASSWORD is not configured in environment variables.');
      return res.status(503).json({
        error: 'Email service is not yet configured with MAIL_PASSWORD.',
        unconfigured: true,
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass: pass.replace(/\s+/g, ''), // Strip spaces from 16-letter App Password
      },
    });

    const mailSubject = `[Portfolio] ${subject || 'New Contact Request'} — from ${name}`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 12px; background-color: #ffffff;">
        <div style="border-bottom: 2px solid #4f46e5; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #1e1b4b; margin: 0; font-size: 20px; font-weight: 700;">New Message from Shivangi's Portfolio</h2>
          <p style="color: #6b7280; margin: 4px 0 0; font-size: 13px;">Received via Portfolio Contact Form</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 6px 0; color: #6b7280; font-size: 14px; width: 90px; font-weight: 600;">From:</td>
            <td style="padding: 6px 0; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Email:</td>
            <td style="padding: 6px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280; font-size: 14px; font-weight: 600;">Subject:</td>
            <td style="padding: 6px 0; color: #111827; font-size: 14px;">${subject || 'General Inquiry'}</td>
          </tr>
        </table>

        <div style="margin-top: 16px;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em; margin-bottom: 8px;">Message Content</div>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #4f46e5; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</div>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f3f4f6; text-align: center;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(mailSubject)}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">
            Reply to ${name}
          </a>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${user}>`,
      replyTo: `"${name}" <${email}>`,
      to: recipient,
      subject: mailSubject,
      text: `New Portfolio Message\n\nFrom: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: htmlContent,
    });

    return res.status(200).json({
      success: true,
      message: 'Message delivered directly to Shivangi Singh via Gmail SMTP.',
    });
  } catch (error: any) {
    console.error('SMTP Error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to dispatch email via SMTP server.',
    });
  }
}
