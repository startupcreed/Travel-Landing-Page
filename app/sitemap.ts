import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanityClient'
import { SEO_LANDING_PAGE_SLUGS_QUERY } from '@/lib/queries'
import { getAllDestinations, getAllPackages } from '@/lib/content'
import { isPackageSeoReady, SITE_URL } from '@/lib/seo'
import { isReservedSlug, isValidContentSlug } from '@/lib/slugs'
import { LEGACY_PACKAGE_REDIRECTS } from '@/lib/redirects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, destinations] = await Promise.all([getAllPackages(), getAllDestinations()])
  let seoPages: { slug?: { current?: string }; canonicalUrl?: string; _updatedAt?: string }[] = []
  try {
    seoPages = (await client.fetch(SEO_LANDING_PAGE_SLUGS_QUERY)) || []
  } catch {}

  const now = new Date()
  const baseRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/kerala-tour-packages`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/kerala-honeymoon-packages`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/kerala-family-tour-packages`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/karnataka`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/tamil-nadu`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
  const packageRoutes: MetadataRoute.Sitemap = packages
    .filter(isPackageSeoReady)
    .map((pkg) => ({
      url: `${SITE_URL}/kerala-tour-packages/${pkg.slug.current}`,
      lastModified: pkg._updatedAt ? new Date(pkg._updatedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  const destinationRoutes: MetadataRoute.Sitemap = destinations
    .filter((destination) => isValidContentSlug(destination.slug?.current) && !destination.noindex)
    .map((destination) => ({
      url: `${SITE_URL}/destinations/${destination.slug.current}`,
      lastModified: destination._updatedAt ? new Date(destination._updatedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  const legacyRoutes: MetadataRoute.Sitemap = seoPages
    .filter((page) => {
      const slug = page.slug?.current
      if (!slug || !isValidContentSlug(slug) || isReservedSlug(slug) || LEGACY_PACKAGE_REDIRECTS[slug]) {
        return false
      }
      if (!page.canonicalUrl) return true
      try {
        return new URL(page.canonicalUrl).pathname.replace(/^\/|\/$/g, '') === slug
      } catch {
        return false
      }
    })
    .map((page) => ({
      url: `${SITE_URL}/${page.slug!.current}`,
      lastModified: page._updatedAt ? new Date(page._updatedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  const routes = [...baseRoutes, ...packageRoutes, ...destinationRoutes, ...legacyRoutes]
  return Array.from(new Map(routes.map((route) => [route.url.replace(/\/$/, ''), route])).values())
}
