const utmKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

export function getLeadAttribution() {
  if (typeof window === 'undefined') {
    return {}
  }

  const searchParams = new URLSearchParams(window.location.search)
  const utm = utmKeys.reduce<Record<string, string>>((result, key) => {
    const value = searchParams.get(key)

    if (value) {
      result[key] = value
    }

    return result
  }, {})

  return {
    sourceUrl: window.location.href,
    ...(Object.keys(utm).length > 0 && { utm }),
  }
}
