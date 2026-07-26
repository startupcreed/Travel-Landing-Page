import { client } from './sanityClient'
import {
  DESTINATION_QUERY,
  DESTINATIONS_QUERY,
  TOUR_PACKAGE_QUERY,
  TOUR_PACKAGES_QUERY,
} from './queries'
import { INITIAL_DESTINATIONS, INITIAL_PACKAGES } from './seoContent'
import type { CMSDestination, CMSTourPackage } from './types'
import { isPackageSeoReady } from './seo'
import { isValidContentSlug } from './slugs'

const APPROVED_PACKAGE_FALLBACK_SLUGS = new Set([
  '4-nights-5-days-kerala-tour-package',
  '5-nights-6-days-munnar-thekkady-alleppey-package',
  'kerala-honeymoon-package-with-houseboat',
])

const PACKAGE_PREVIEW_FALLBACK_SLUGS = new Set([
  '4-nights-5-days-kerala-tour-package',
  '5-nights-6-days-munnar-thekkady-alleppey-package',
  'kerala-honeymoon-package-with-houseboat',
  '3-nights-4-days-kerala-tour-package',
])

const APPROVED_DESTINATION_FALLBACK_SLUGS = new Set([
  'munnar',
  'alleppey',
  'thekkady',
  'kochi',
])

const approvedPackageFallbacks = () =>
  INITIAL_PACKAGES.filter((item) => APPROVED_PACKAGE_FALLBACK_SLUGS.has(item.slug.current))

const approvedDestinationFallbacks = () =>
  INITIAL_DESTINATIONS.filter((item) => APPROVED_DESTINATION_FALLBACK_SLUGS.has(item.slug.current))

async function safeFetch<T>(query: string, params?: Record<string, string>): Promise<T | null> {
  try {
    return await client.fetch(query, params)
  } catch (error) {
    console.error('Sanity content fetch failed:', error)
    return null
  }
}

export async function getAllPackages(): Promise<CMSTourPackage[]> {
  const cmsPackages = await safeFetch<CMSTourPackage[]>(TOUR_PACKAGES_QUERY)
  if (!cmsPackages?.length) return approvedPackageFallbacks().filter(isPackageSeoReady) as CMSTourPackage[]
  const indexablePackages = cmsPackages.filter(isPackageSeoReady) as CMSTourPackage[]
  const cmsSlugs = new Set(cmsPackages.map((item) => item.slug?.current))
  const fallbacks = approvedPackageFallbacks()
    .filter(isPackageSeoReady)
    .filter((item) => !cmsSlugs.has(item.slug.current)) as CMSTourPackage[]
  return [...indexablePackages, ...fallbacks]
}

export async function getPackage(slug: string): Promise<CMSTourPackage | null> {
  if (!isValidContentSlug(slug)) return null
  const cmsPackage = await safeFetch<CMSTourPackage>(TOUR_PACKAGE_QUERY, { slug })
  if (cmsPackage) return cmsPackage
  return INITIAL_PACKAGES.find((item) =>
    PACKAGE_PREVIEW_FALLBACK_SLUGS.has(item.slug.current) && item.slug.current === slug
  ) || null
}

export async function getAllDestinations(): Promise<CMSDestination[]> {
  const cmsDestinations = await safeFetch<CMSDestination[]>(DESTINATIONS_QUERY)
  if (!cmsDestinations?.length) return approvedDestinationFallbacks()
  const indexableDestinations = cmsDestinations.filter((item) =>
    !item.noindex && isValidContentSlug(item.slug?.current)
  )
  const cmsSlugs = new Set(cmsDestinations.map((item) => item.slug?.current))
  return [
    ...indexableDestinations,
    ...approvedDestinationFallbacks().filter((item) => !cmsSlugs.has(item.slug.current)),
  ]
}

export async function getDestination(slug: string): Promise<CMSDestination | null> {
  if (!isValidContentSlug(slug)) return null
  const cmsDestination = await safeFetch<CMSDestination>(DESTINATION_QUERY, { slug })
  if (cmsDestination) return cmsDestination
  return approvedDestinationFallbacks().find((item) => item.slug.current === slug) || null
}
