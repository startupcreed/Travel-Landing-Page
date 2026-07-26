export const RESERVED_SLUGS = [
  'destinations',
  'kerala-tour-packages',
  'kerala-family-tour-packages',
  'kerala-honeymoon-packages',
  'api',
  'studio',
  'privacy-policy',
  'terms-and-conditions',
  'contact',
  'about-us',
  'blog',
] as const

const reservedSlugSet = new Set<string>(RESERVED_SLUGS)
const VALID_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function isReservedSlug(slug?: string | null) {
  return Boolean(slug && reservedSlugSet.has(slug.toLowerCase()))
}

export function isValidContentSlug(slug?: string | null) {
  return Boolean(
    slug &&
    slug === slug.toLowerCase() &&
    VALID_SLUG_PATTERN.test(slug) &&
    !isReservedSlug(slug)
  )
}
