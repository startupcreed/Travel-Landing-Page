import nodemailer from 'nodemailer'

export type LeadEmailInput = {
  name: string
  phone: string
  email?: string
  travelDate?: string
  destination?: string
  message?: string
  sourceUrl?: string
  utm?: Record<string, string>
  submittedAt: string
}

const requiredEnvVars = [
  'LEAD_EMAIL_TO',
  'LEAD_EMAIL_FROM',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
] as const

function requireEmailConfig() {
  const missing = requiredEnvVars.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing lead email configuration: ${missing.join(', ')}`)
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatValue(value?: string) {
  return value?.trim() ? value.trim() : 'Not provided'
}

function formatUtmParams(utm?: Record<string, string>) {
  if (!utm || Object.keys(utm).length === 0) {
    return 'Not provided'
  }

  return Object.entries(utm)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
}

function buildLeadEmailText(lead: LeadEmailInput) {
  return [
    'New KeralaTour.info lead',
    '',
    `Name: ${formatValue(lead.name)}`,
    `Phone / WhatsApp: ${formatValue(lead.phone)}`,
    `Email: ${formatValue(lead.email)}`,
    `Travel date: ${formatValue(lead.travelDate)}`,
    `Destination: ${formatValue(lead.destination)}`,
    `Message / special requirements: ${formatValue(lead.message)}`,
    `Page URL: ${formatValue(lead.sourceUrl)}`,
    'UTM parameters:',
    formatUtmParams(lead.utm),
    `Submitted date/time: ${lead.submittedAt}`,
  ].join('\n')
}

function buildLeadEmailHtml(lead: LeadEmailInput) {
  const rows = [
    ['Name', formatValue(lead.name)],
    ['Phone / WhatsApp', formatValue(lead.phone)],
    ['Email', formatValue(lead.email)],
    ['Travel date', formatValue(lead.travelDate)],
    ['Destination', formatValue(lead.destination)],
    ['Message / special requirements', formatValue(lead.message)],
    ['Page URL', formatValue(lead.sourceUrl)],
    ['UTM parameters', formatUtmParams(lead.utm)],
    ['Submitted date/time', lead.submittedAt],
  ]

  return `
    <h2>New KeralaTour.info lead</h2>
    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #ddd;">
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <th align="left" style="background: #f6f6f6;">${escapeHtml(label)}</th>
              <td style="white-space: pre-line;">${escapeHtml(value)}</td>
            </tr>
          `
        )
        .join('')}
    </table>
  `
}

export async function sendLeadEmail(lead: LeadEmailInput) {
  requireEmailConfig()

  const port = Number(process.env.SMTP_PORT)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.LEAD_EMAIL_FROM,
    to: process.env.LEAD_EMAIL_TO,
    replyTo: lead.email || undefined,
    subject: `New Kerala tour lead - ${lead.name}`,
    text: buildLeadEmailText(lead),
    html: buildLeadEmailHtml(lead),
  })
}
