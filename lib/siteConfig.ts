// Use direct env references so Next.js includes these values in client bundles.
const configuredPhone = process.env.NEXT_PUBLIC_PRIMARY_PHONE?.trim()
const phone = configuredPhone && /^\d{10}$/.test(configuredPhone)
  ? configuredPhone
  : '9650691672'

export const PRIMARY_CONTACT = {
  phone,
  tel: `+91${phone}`,
  whatsapp: `91${phone}`,
}

const configuredEnabled = process.env.NEXT_PUBLIC_LEAD_POPUP_ENABLED?.trim().toLowerCase()
const configuredDelay = process.env.NEXT_PUBLIC_LEAD_POPUP_DELAY_SECONDS?.trim()
const delaySeconds = configuredDelay ? Number(configuredDelay) : NaN

export const LEAD_POPUP_CONFIG = {
  enabled: configuredEnabled !== 'false',
  // Reject values that would overflow the browser timer and fire immediately.
  delayMs: Number.isFinite(delaySeconds) && delaySeconds >= 0 && delaySeconds <= 2147483.647
    ? delaySeconds * 1000
    : 30000,
}
