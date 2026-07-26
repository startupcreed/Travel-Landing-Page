import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import SEOLandingPageComponent from '@/components/SEOLandingPage'
import JsonLd from '@/components/JsonLd'
import { CONTACT_INFO } from '@/constants'
import { client } from '@/lib/sanityClient'
import { SEO_LANDING_PAGE_QUERY, TOUR_PACKAGE_QUERY } from '@/lib/queries'
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/seo'
import { isValidContentSlug } from '@/lib/slugs'
import { LEGACY_PACKAGE_REDIRECTS } from '@/lib/redirects'
import type { CMSSEOLandingPage, CMSTourPackage } from '@/lib/types'

interface Props {
  params: { slug: string }
}

async function getSeoLandingPage(slug: string) {
  try {
    return await client.fetch<CMSSEOLandingPage | null>(SEO_LANDING_PAGE_QUERY, { slug })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isValidContentSlug(params.slug) || LEGACY_PACKAGE_REDIRECTS[params.slug]) return {}

  const seoPage = await getSeoLandingPage(params.slug)
  if (!seoPage) return {}

  return pageMetadata({
    title: seoPage.seoTitle || seoPage.heroHeading || seoPage.title,
    description: seoPage.seoDescription || seoPage.heroSubtitle || seoPage.overview || seoPage.title,
    path: `/${params.slug}`,
    canonicalUrl: seoPage.canonicalUrl,
    image: seoPage.ogImage || seoPage.heroImage,
    noindex: seoPage.noindex,
  })
}

export default async function RootSeoLandingPage({ params }: Props) {
  const redirectTarget = LEGACY_PACKAGE_REDIRECTS[params.slug]
  if (redirectTarget) permanentRedirect(redirectTarget)
  if (!isValidContentSlug(params.slug)) notFound()

  const seoPage = await getSeoLandingPage(params.slug)
  if (seoPage) {
    const path = `/${params.slug}`
    return (
      <>
        <JsonLd data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: seoPage.title, path },
        ])} />
        <JsonLd data={faqJsonLd(seoPage.faqs)} />
        {seoPage.startingPrice && (
          <JsonLd data={{
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: seoPage.title,
            description: seoPage.overview,
            url: `https://www.keralatour.info${path}`,
            itinerary: seoPage.shortItinerary?.map((day) => ({
              '@type': 'Place',
              name: day.title,
              description: day.description,
            })),
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: seoPage.startingPrice.toString(),
              url: `https://www.keralatour.info${path}`,
            },
          }} />
        )}
        <SEOLandingPageComponent page={seoPage} whatsappNumber={CONTACT_INFO.whatsapp} />
      </>
    )
  }

  let tourPackage: CMSTourPackage | null = null
  try {
    tourPackage = await client.fetch<CMSTourPackage | null>(TOUR_PACKAGE_QUERY, { slug: params.slug })
  } catch {}
  if (tourPackage) permanentRedirect(`/kerala-tour-packages/${tourPackage.slug.current}`)

  notFound()
}
