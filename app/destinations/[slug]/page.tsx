import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DestinationDetail from '@/components/DestinationDetail'
import JsonLd from '@/components/JsonLd'
import { getAllDestinations, getAllPackages, getDestination } from '@/lib/content'
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, isPackageSeoReady, pageMetadata, sanityImageUrl } from '@/lib/seo'

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const destinations = await getAllDestinations()
  return destinations.map((destination) => ({ slug: destination.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destination = await getDestination(params.slug)
  if (!destination) return {}
  return pageMetadata({
    title: destination.seoTitle || `${destination.name} Kerala Travel Guide`,
    description: destination.seoDescription || destination.heroSubtitle || destination.overview || `Plan a visit to ${destination.name}.`,
    path: `/destinations/${destination.slug.current}`,
    canonicalUrl: destination.canonicalUrl,
    image: destination.heroImage,
    noindex: destination.noindex,
  })
}

export default async function DestinationPage({ params }: Props) {
  const destination = await getDestination(params.slug)
  if (!destination) notFound()
  const allPackages = await getAllPackages()
  const referenced = (destination.packages || []).filter(isPackageSeoReady)
  const packages = referenced.length
    ? referenced
    : allPackages.filter((pkg) =>
        pkg.relatedDestinations?.some((item) => item.slug.current === destination.slug.current) ||
        pkg.destinations?.some((item) => item.slug.current === destination.slug.current) ||
        pkg.locations?.some((item) => item.toLowerCase().includes(destination.slug.current))
      )
  const path = `/destinations/${destination.slug.current}`
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Destinations', path: '/kerala-tour-packages#destinations' },
        { name: destination.name, path },
      ])} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: destination.name,
        description: destination.overview,
        url: absoluteUrl(path),
        image: sanityImageUrl(destination.heroImage) || undefined,
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: destination.heroTitle || destination.name,
        description: destination.seoDescription || destination.overview,
        url: absoluteUrl(path),
      }} />
      <JsonLd data={faqJsonLd(destination.faqs)} />
      <DestinationDetail destination={destination} packages={packages} />
    </>
  )
}
