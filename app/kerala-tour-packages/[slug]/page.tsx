import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PackageDetail from '@/components/PackageDetail'
import JsonLd from '@/components/JsonLd'
import { getAllPackages, getPackage } from '@/lib/content'
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, isPackageSeoReady, pageMetadata, sanityImageUrl } from '@/lib/seo'

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const packages = await getAllPackages()
  return packages.map((pkg) => ({ slug: pkg.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await getPackage(params.slug)
  if (!pkg) return {}
  const isReady = isPackageSeoReady(pkg)
  return pageMetadata({
    title: pkg.seo?.seoTitle || pkg.seo?.metaTitle || pkg.title,
    description: pkg.seo?.seoDescription || pkg.seo?.metaDescription || pkg.shortSummary || pkg.description || `Explore ${pkg.title}.`,
    path: `/kerala-tour-packages/${pkg.slug.current}`,
    canonicalUrl: pkg.seo?.canonicalUrl,
    image: pkg.seo?.seoImage || pkg.seo?.ogImage || pkg.heroImage,
    noindex: !isReady,
  })
}

export default async function TourPackagePage({ params }: Props) {
  const pkg = await getPackage(params.slug)
  if (!pkg) notFound()
  const isReady = isPackageSeoReady(pkg)
  if (!pkg.relatedPackages?.length) {
    const allPackages = await getAllPackages()
    pkg.relatedPackages = allPackages
      .filter((item) => item.slug.current !== pkg.slug.current)
      .slice(0, 3)
  } else {
    pkg.relatedPackages = pkg.relatedPackages.filter(isPackageSeoReady)
  }

  const path = `/kerala-tour-packages/${pkg.slug.current}`
  const description = pkg.shortSummary || pkg.description || pkg.title
  const trip: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description,
    url: absoluteUrl(path),
    image: sanityImageUrl(pkg.heroImage) || undefined,
    touristType: pkg.categories?.map((category) => category.title),
    itinerary: pkg.itinerary?.map((day) => ({
      '@type': 'ItemList',
      name: `${day.day}: ${day.title}`,
      description: day.description,
    })),
  }
  const product: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.title,
    description,
    image: sanityImageUrl(pkg.heroImage) || undefined,
    url: absoluteUrl(path),
  }
  if (typeof pkg.price === 'number') {
    product.offers = { '@type': 'Offer', price: pkg.price, priceCurrency: 'INR', url: absoluteUrl(path) }
  }

  return (
    <>
      {isReady && <JsonLd data={breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Kerala Tour Packages', path: '/kerala-tour-packages' },
        { name: pkg.title, path },
      ])} />}
      {isReady && <JsonLd data={trip} />}
      {isReady && <JsonLd data={product} />}
      {isReady && <JsonLd data={faqJsonLd(pkg.faqs)} />}
      <PackageDetail pkg={pkg} />
    </>
  )
}
