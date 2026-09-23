import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Helper to escape HTML characters in message body
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper to strip newline/CR characters to prevent email header injection
function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Malformed request payload." },
        { status: 400 }
      );
    }

    const { name, email, subject, message, _gotcha } = body;

    // 1. Honeypot check: If the hidden field is filled, it's an automated bot
    if (_gotcha && String(_gotcha).trim().length > 0) {
      // Silently succeed to fool spambots
      return NextResponse.json({
        success: true,
        message: "Dispatch transmission confirmed.",
      });
    }

    // 2. Defensive Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Please provide your name." },
        { status: 400 }
      );
    }

    if (name.trim().length > 100) {
      return NextResponse.json(
        { success: false, message: "Name must be under 100 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !email ||
      typeof email !== "string" ||
      !emailRegex.test(email.trim()) ||
      email.trim().length > 150
    ) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Please provide a subject line." },
        { status: 400 }
      );
    }

    if (subject.trim().length > 200) {
      return NextResponse.json(
        { success: false, message: "Subject must be under 200 characters." },
        { status: 400 }
      );
    }

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length < 10
    ) {
      return NextResponse.json(
        { success: false, message: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    if (message.trim().length > 5000) {
      return NextResponse.json(
        { success: false, message: "Message must be under 5000 characters." },
        { status: 400 }
      );
    }

    // Cleaned sanitized strings
    const cleanName = sanitizeHeader(name);
    const cleanEmail = sanitizeHeader(email);
    const cleanSubject = sanitizeHeader(subject);
    const cleanMessage = message.trim();

    // 3. Credentials resolution
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = (
      process.env.SMTP_PASS ||
      process.env.GMAIL_APP_PASSWORD ||
      ""
    ).replace(/\s+/g, ""); // Strip spaces if user copied Google App Password as "xxxx xxxx xxxx xxxx"
    const recipientEmail =
      process.env.CONTACT_RECEIVER_EMAIL ||
      smtpUser ||
      "work.amandadheech2005@gmail.com";

    if (!smtpUser || !smtpPass) {
      console.warn(
        "⚠️ [API /api/contact]: SMTP credentials are not configured in environment variables (SMTP_USER / SMTP_PASS)."
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is awaiting credentials setup in .env.local. Please contact directly at work.amandadheech2005@gmail.com",
        },
        { status: 503 }
      );
    }

    // 4. Initialize Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // 5. Stylized HTML Email Dispatch
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Portfolio Dispatch</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #03060f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0a0f1d; border: 1px solid rgba(6, 182, 212, 0.4); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);">
    
    <!-- Top Cyber Accent Bar -->
    <div style="background: linear-gradient(90deg, #fcee0a, #00f0ff); height: 4px; width: 100%;"></div>

    <!-- Header Section -->
    <div style="padding: 24px 28px; border-bottom: 1px solid rgba(6, 182, 212, 0.2); background-color: #070b16;">
      <div style="font-family: monospace; font-size: 11px; letter-spacing: 2px; color: #fcee0a; text-transform: uppercase; margin-bottom: 6px;">
        // TRANSMISSION DISPATCH RECEIVED
      </div>
      <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
        New Message from ${escapeHtml(cleanName)}
      </h1>
      <div style="font-family: monospace; font-size: 12px; color: #67e8f9; margin-top: 6px;">
        TIME: ${timestamp} IST
      </div>
    </div>

    <!-- Payload Content -->
    <div style="padding: 28px;">
      <!-- Key Meta Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 12px; font-family: monospace; font-size: 12px; color: #67e8f9; text-transform: uppercase; width: 110px; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
            Sender Name:
          </td>
          <td style="padding: 8px 12px; color: #ffffff; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
            ${escapeHtml(cleanName)}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-family: monospace; font-size: 12px; color: #67e8f9; text-transform: uppercase; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
            Sender Email:
          </td>
          <td style="padding: 8px 12px; color: #fcee0a; font-family: monospace; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
            <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #fcee0a; text-decoration: none;">
              ${escapeHtml(cleanEmail)}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-family: monospace; font-size: 12px; color: #67e8f9; text-transform: uppercase; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
            Subject:
          </td>
          <td style="padding: 8px 12px; color: #ffffff; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
            ${escapeHtml(cleanSubject)}
          </td>
        </tr>
      </table>

      <!-- Message Box -->
      <div style="margin-bottom: 24px;">
        <div style="font-family: monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px;">
          // PAYLOAD MESSAGE BODY:
        </div>
        <div style="background-color: #03060f; border: 1px solid rgba(6, 182, 212, 0.25); border-left: 3px solid #00f0ff; border-radius: 4px; padding: 18px; color: #e2e8f0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${escapeHtml(cleanMessage)}</div>
      </div>

      <!-- Action Button (Direct Reply) -->
      <div style="text-align: center; margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
        <a href="mailto:${escapeHtml(cleanEmail)}?subject=Re:%20${encodeURIComponent(cleanSubject)}" 
           style="display: inline-block; background-color: #fcee0a; color: #000000; font-family: monospace; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 2px; text-transform: uppercase; letter-spacing: 1px;">
          Direct Reply to ${escapeHtml(cleanName)} &rarr;
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 16px 28px; background-color: #050813; border-top: 1px solid rgba(255, 255, 255, 0.06); font-family: monospace; font-size: 11px; color: #64748b; text-align: center;">
      Transmitted via Aman Dadheech Developer Portfolio [App Router]
    </div>
  </div>
</body>
</html>
    `;

    const textContent = `
[NEW PORTFOLIO MESSAGE DISPATCH]
------------------------------------------------
From: ${cleanName} (${cleanEmail})
Subject: ${cleanSubject}
Date: ${timestamp} IST

Message:
${cleanMessage}
------------------------------------------------
Reply directly to this email or write to: ${cleanEmail}
    `.trim();

    // 6. Transmit Email via Nodemailer
    await transporter.sendMail({
      from: `"${cleanName} (via Portfolio)" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: cleanEmail,
      subject: `[Portfolio Dispatch] ${cleanSubject} — from ${cleanName}`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: `Transmission confirmed, ${cleanName}! Your message has been delivered to Aman's inbox.`,
    });
  } catch (error: unknown) {
    console.error("❌ [API /api/contact] Error sending email dispatch:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal transmission failure";

    return NextResponse.json(
      {
        success: false,
        message: `Failed to dispatch message (${errorMessage}). Please try contacting directly at work.amandadheech2005@gmail.com`,
      },
      { status: 500 }
    );
  }
}
