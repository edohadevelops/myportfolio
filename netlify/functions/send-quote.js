const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return {
      statusCode: 503,
      body: JSON.stringify({
        error: 'Email service not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD to Netlify environment variables.',
      }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body.' }) };
  }

  const {
    clientDetails,
    projectType,
    selectedFeatures = [],
    selectedAddons = [],
    timeline,
    totals,
    currency,
    quoteRef,
    pdfBase64,
    projectBrief,
    timelineSurchargePercent = 0,
  } = body;

  const sym = currency?.symbol || '$';
  const code = currency?.code || 'USD';

  const featuresRows = selectedFeatures.map(f =>
    `<tr><td style="padding:6px 8px;border-bottom:1px solid #f0ebe1">${f.name}</td>
     <td style="padding:6px 8px;border-bottom:1px solid #f0ebe1;text-align:right;font-weight:600">${sym}${Math.round(f.price * (currency?.rate || 1)).toLocaleString()}</td></tr>`
  ).join('');

  const addonsRows = selectedAddons.map(a =>
    `<tr><td style="padding:6px 8px;border-bottom:1px solid #f0ebe1">${a.name}</td>
     <td style="padding:6px 8px;border-bottom:1px solid #f0ebe1;text-align:right;font-weight:600">${sym}${Math.round(a.price * (currency?.rate || 1)).toLocaleString()}</td></tr>`
  ).join('');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f4f2ee">
  <div style="max-width:580px;margin:32px auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12)">

    <!-- Header -->
    <div style="background:#0f0f1a;padding:28px 32px">
      <div style="display:flex;align-items:center;gap:16px">
        <div style="width:44px;height:44px;border-radius:50%;background:#D4AF37;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#0f0f1a;font-family:Georgia,serif;flex-shrink:0;text-align:center;line-height:44px">A.E.</div>
        <div>
          <h1 style="margin:0;color:#D4AF37;font-size:18px;font-weight:700">New Quote Request</h1>
          <p style="margin:3px 0 0;color:rgba(255,255,255,0.5);font-size:12px">Ref: ${quoteRef}</p>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;padding:28px 32px">

      <!-- Client -->
      <h2 style="margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:0.06em;color:#9CA3AF">Client</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <tr><td style="padding:5px 0;color:#6B7280;font-size:13px;width:100px">Name</td>
            <td style="padding:5px 0;font-weight:600;font-size:13px">${clientDetails?.name}</td></tr>
        <tr><td style="padding:5px 0;color:#6B7280;font-size:13px">Email</td>
            <td style="padding:5px 0;font-size:13px"><a href="mailto:${clientDetails?.email}" style="color:#4F46E5">${clientDetails?.email}</a></td></tr>
        ${clientDetails?.company ? `<tr><td style="padding:5px 0;color:#6B7280;font-size:13px">Company</td>
            <td style="padding:5px 0;font-size:13px">${clientDetails.company}</td></tr>` : ''}
      </table>

      <!-- Project breakdown -->
      <h2 style="margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:0.06em;color:#9CA3AF">Breakdown</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:13px">
        <tr style="background:#f8f7f4">
          <td style="padding:8px;font-weight:600">${projectType?.icon || ''} ${projectType?.name}</td>
          <td style="padding:8px;text-align:right;font-weight:600">${sym}${totals?.base?.toLocaleString()}</td>
        </tr>
        ${featuresRows}
        ${timelineSurchargePercent > 0 ? `
        <tr><td style="padding:6px 8px;border-bottom:1px solid #f0ebe1">Faster timeline (+${timelineSurchargePercent}%)</td>
            <td style="padding:6px 8px;border-bottom:1px solid #f0ebe1;text-align:right;font-weight:600">${sym}${totals?.timelineSurcharge?.toLocaleString()}</td></tr>` : ''}
        ${addonsRows}
        ${totals?.discount > 0 ? `
        <tr><td style="padding:6px 8px;color:#16A34A;font-style:italic">10% loyalty discount</td>
            <td style="padding:6px 8px;text-align:right;color:#16A34A;font-weight:600">-${sym}${totals.discount.toLocaleString()}</td></tr>` : ''}
      </table>

      <!-- Total -->
      <div style="background:#0f0f1a;border-radius:8px;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <span style="color:rgba(255,255,255,0.7);font-size:13px">Total Estimate</span>
        <span style="color:#D4AF37;font-size:22px;font-weight:700">${sym}${totals?.total?.toLocaleString()} ${code}</span>
      </div>

      ${timeline ? `<p style="font-size:13px;color:#6B7280;margin:0 0 8px"><strong style="color:#374151">Timeline:</strong> ${timeline}</p>` : ''}

      ${projectBrief ? `
      <div style="border-left:3px solid #D4AF37;padding:10px 14px;background:#FFFDF5;border-radius:0 8px 8px 0;margin:16px 0">
        <p style="margin:0;font-size:13px;color:#4B5563;font-style:italic">"${projectBrief}"</p>
      </div>` : ''}

      <p style="font-size:12px;color:#9CA3AF;margin:20px 0 0">The full PDF quote is attached to this email.</p>
    </div>

    <!-- Footer -->
    <div style="background:#f8f7f4;padding:14px 32px;text-align:center">
      <p style="margin:0;font-size:11px;color:#9CA3AF">EdohaDeveloped &nbsp;·&nbsp; edohadevelops@gmail.com</p>
    </div>

  </div>
</body>
</html>`;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `EdohaDeveloped <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: `[NEW QUOTE] ${clientDetails?.name} — ${projectType?.name} — ${sym}${totals?.total?.toLocaleString()} ${code}`,
      priority: 'high',
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
      },
      html,
      attachments: pdfBase64
        ? [
            {
              filename: `EdohaDeveloped_Plan_${quoteRef}.pdf`,
              content: pdfBase64,
              encoding: 'base64',
              contentType: 'application/pdf',
            },
          ]
        : [],
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, quoteRef }),
    };
  } catch (err) {
    console.error('send-quote error:', err?.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to send email: ${err?.message}` }),
    };
  }
};
