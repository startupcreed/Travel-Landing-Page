import type { Metadata } from 'next'
import type { CMSFAQ, CMSImage, CMSTourPackage, CMSTourPackageSummary } from './types'
import { urlFor } from './imageUrl'
import { isValidContentSlug } from './slugs'

export const SITE_URL = 'https://www.keralatour.info'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/img/KeralaTravelPackage.webp`

type PackageSeoCandidate = CMSTourPackage | CMSTourPackageSummary

const hasMeaningfulText = (value?: string) => Boolean(value && value.trim().length >= 40)

export function isPackageSeoReady(pkg?: PackageSeoCandidate | null): pkg is PackageSeoCandidate {
  if (!pkg || pkg.seo?.noindex === true) return false

  const hasRoute =
    pkg.locations?.some((location) => Boolean(location?.trim())) ||
    pkg.destinations?.some((destination) => isValidContentSlug(destination.slug?.current)) ||
    pkg.relatedDestinations?.some((destination) => isValidContentSlug(destination.slug?.current))

  return Boolean(
    pkg.title?.trim() &&
    isValidContentSlug(pkg.slug?.current) &&
    hasMeaningfulText(pkg.shortSummary) &&
    hasMeaningfulText(pkg.description) &&
    hasRoute
  )
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function sanityImageUrl(image?: CMSImage, width = 1200, height = 630) {
  if (!image) return ''
  try {
    return urlFor(image).width(width).height(height).url()
  } catch {
    return image.asset?.url || ''
  }
}

export function pageMetadata({
  title,
  description,
  path,
  canonicalUrl,
  image,
  noindex = false,
}: {
  title: string
  description: string
  path: string
  canonicalUrl?: string
  image?: CMSImage | string
  noindex?: boolean
}): Metadata {
  let canonical = absoluteUrl(path)
  if (canonicalUrl) {
    try {
      const candidate = new URL(canonicalUrl)
      if (candidate.protocol === 'https:' && candidate.hostname === 'www.keralatour.info') {
        candidate.search = ''
        candidate.hash = ''
        canonical = candidate.toString().replace(/\/$/, '') || SITE_URL
      }
    } catch {}
  }
  const imageUrl =
    typeof image === 'string' ? absoluteUrl(image) : sanityImageUrl(image) || DEFAULT_OG_IMAGE

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: { index: !noindex, follow: !noindex },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'KeralaTour.info',
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export type BreadcrumbItem = { name: string; path: string }

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqJsonLd(faqs?: CMSFAQ[]) {
  const validFaqs = faqs?.filter((faq) => faq.question && faq.answer)
  if (!validFaqs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}
