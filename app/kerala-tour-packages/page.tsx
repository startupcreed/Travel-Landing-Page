import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ContactForm from '@/components/ContactForm'
import JsonLd from '@/components/JsonLd'
import { DestinationLinkCard, PackageLinkCard } from '@/components/SeoCards'
import { getAllDestinations, getAllPackages } from '@/lib/content'
import { HUB_FAQS } from '@/lib/seoContent'
import { CONTACT_INFO } from '@/constants'
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/seo'

export const revalidate = 3600

const HUB_TITLE = 'Kerala Tour Packages 2026 | Family, Honeymoon & Custom Trips'
const HUB_DESCRIPTION = 'Explore customised Kerala tour packages covering Munnar, Thekkady, Alleppey, Kochi and Kovalam. Compare family, honeymoon, houseboat and budget itineraries.'

export const metadata: Metadata = pageMetadata({
  title: HUB_TITLE,
  description: HUB_DESCRIPTION,
  path: '/kerala-tour-packages',
  image: '/packages/Amazing-Kerala.webp',
})

export default async function KeralaTourPackagesHub() {
  const [packages, destinations] = await Promise.all([getAllPackages(), getAllDestinations()])
  const whatsappMessage = encodeURIComponent('Hi, I would like help planning a customised Kerala tour package.')
  const durationGroups = new Map<string, typeof packages>()
  const sortedPackages = [...packages].sort((a, b) =>
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    (a.days ?? Number.MAX_SAFE_INTEGER) - (b.days ?? Number.MAX_SAFE_INTEGER) ||
    a.title.localeCompare(b.title)
  )
  sortedPackages.forEach((pkg) => {
    const key = pkg.days ? `${pkg.days} days` : pkg.duration || 'Flexible duration'
    durationGroups.set(key, [...(durationGroups.get(key) || []), pkg])
  })
  const sortedDurationGroups = Array.from(durationGroups.entries()).sort(([, a], [, b]) =>
    (a[0]?.days ?? Number.MAX_SAFE_INTEGER) - (b[0]?.days ?? Number.MAX_SAFE_INTEGER)
  )
  const collectionJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kerala Tour Packages',
    description: HUB_DESCRIPTION,
    url: absoluteUrl('/kerala-tour-packages'),
  }
  if (sortedPackages.length) {
    collectionJsonLd.mainEntity = {
      '@type': 'ItemList',
      itemListElement: sortedPackages.map((pkg, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: pkg.title,
        url: absoluteUrl(`/kerala-tour-packages/${pkg.slug.current}`),
      })),
    }
  }

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Kerala Tour Packages', path: '/kerala-tour-packages' }])} />
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={faqJsonLd(HUB_FAQS)} />
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Kerala Tour Packages', path: '/kerala-tour-packages' }]} />
      <article>
        <section className='max-container padding-container py-12 text-center lg:py-20'>
          <p className='font-semibold uppercase tracking-wider text-[#F85E9F]'>Plan with Kerala travel specialists</p>
          <h1 className='mx-auto mt-4 max-w-5xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl'>Kerala Tour Packages for Custom Family, Honeymoon & Leisure Trips</h1>
          <p className='mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600'>Explore flexible Kerala itineraries across hill stations, backwaters, wildlife destinations and beaches. Starting prices vary by travel dates, hotel category and selected inclusions.</p>
          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <a href='#contact' className='rounded-full bg-[#5D50C6] px-8 py-3 font-semibold text-white'>Request a Custom Quote</a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappMessage}`} target='_blank' rel='noopener noreferrer' className='rounded-full bg-[#25D366] px-8 py-3 font-semibold text-white'>Plan on WhatsApp</a>
          </div>
        </section>

        <section className='max-container padding-container py-16'>
          <h2 className='mb-10 text-center text-3xl font-bold lg:text-4xl'>Featured Kerala Packages</h2>
          {sortedPackages.length ? (
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>{sortedPackages.slice(0, 4).map((pkg) => <PackageLinkCard key={pkg.slug.current} pkg={pkg} />)}</div>
          ) : (
            <p className='text-center text-gray-700'>Approved package itineraries are being prepared. Request a custom plan for your dates.</p>
          )}
        </section>

        <section className='bg-[#f9f7ff] py-16'>
          <div className='max-container padding-container'>
            <h2 className='mb-10 text-3xl font-bold lg:text-4xl'>Kerala Packages by Duration</h2>
            <div className='space-y-10'>
              {sortedDurationGroups.map(([duration, items]) => (
                <div key={duration}>
                  <h3 className='mb-5 text-2xl font-bold capitalize'>{duration} Kerala itineraries</h3>
                  <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>{items.map((pkg) => <PackageLinkCard key={pkg.slug.current} pkg={pkg} />)}</div>
                </div>
              ))}
              {!sortedDurationGroups.length && <p className='text-gray-700'>No approved duration guides are available yet. Tell us your preferred trip length for a custom itinerary.</p>}
            </div>
          </div>
        </section>

        <section className='max-container padding-container grid gap-8 py-16 lg:grid-cols-2'>
          <div className='rounded-3xl bg-white p-8 shadow-lg'>
            <h2 className='text-3xl font-bold'>Packages by Traveller Type</h2>
            <p className='mt-4 leading-relaxed text-gray-700'>Couples may prefer a slower hill-and-backwater plan, while families often benefit from shorter road stages and flexible sightseeing. These category pages use distinct planning guidance.</p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <Link href='/kerala-honeymoon-packages' className='rounded-full bg-[#F85E9F] px-5 py-3 font-semibold text-white'>Kerala Honeymoon Packages</Link>
              <Link href='/kerala-family-tour-packages' className='rounded-full bg-[#5D50C6] px-5 py-3 font-semibold text-white'>Kerala Family Tour Packages</Link>
            </div>
          </div>
          <div className='rounded-3xl bg-[#191825] p-8 text-white'>
            <h2 className='text-3xl font-bold'>Popular Kerala Routes</h2>
            <ul className='mt-5 space-y-3 text-white/80'>
              <li>Kochi – Munnar – Thekkady – Alleppey</li>
              <li>Munnar – Alleppey – Varkala – Kovalam</li>
              <li>Kochi – Alleppey – Varkala – Kovalam</li>
            </ul>
            <p className='mt-5 text-sm text-white/70'>Routes are planning examples from existing site package data. Final sequencing depends on arrival point, dates and road conditions.</p>
          </div>
        </section>

        <section id='destinations' className='max-container padding-container py-16'>
          <h2 className='mb-10 text-center text-3xl font-bold lg:text-4xl'>Kerala Destinations to Add to Your Trip</h2>
          {destinations.length ? (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>{destinations.map((destination) => <DestinationLinkCard key={destination.slug.current} destination={destination} />)}</div>
          ) : (
            <p className='text-center text-gray-700'>Destination guides are being prepared. Contact us to plan a route around your interests.</p>
          )}
        </section>

        <section className='bg-[#f9f7ff] py-16'>
          <div className='max-container padding-container grid gap-10 lg:grid-cols-3'>
            <div><h2 className='text-3xl font-bold'>Kerala Package Price Guidance</h2><p className='mt-4 leading-relaxed text-gray-700'>Price changes with dates, traveller count, route, stay category, vehicle, houseboat arrangements and selected inclusions. Treat visible starting prices as references and verify the complete quotation before booking.</p></div>
            <div><h2 className='text-3xl font-bold'>Best Time to Visit Kerala</h2><p className='mt-4 leading-relaxed text-gray-700'>Drier months are popular for general touring. Summer can be warmer in the lowlands, while monsoon months offer lush scenery with heavier rain and a greater need for flexibility.</p></div>
            <div><h2 className='text-3xl font-bold'>Typical Inclusion Planning</h2><p className='mt-4 leading-relaxed text-gray-700'>A quotation may cover stays, transport, selected meals or a houseboat, but inclusions differ. Only the final written quotation defines what is included or excluded.</p></div>
          </div>
        </section>

        <section className='max-container padding-container py-16'>
          <h2 className='mb-8 text-3xl font-bold'>Kerala Tour Package FAQs</h2>
          <div className='space-y-4'>{HUB_FAQS.map((faq) => <details key={faq.question} className='rounded-xl bg-white p-6 shadow'><summary className='cursor-pointer font-semibold'>{faq.question}</summary><p className='mt-3 text-gray-700'>{faq.answer}</p></details>)}</div>
          <div className='mt-12'>
            <h2 className='text-3xl font-bold'>Related Kerala Travel Guides</h2>
            {destinations.length ? <div className='mt-5 flex flex-wrap gap-3'>{destinations.map((destination) => <Link key={destination.slug.current} href={`/destinations/${destination.slug.current}`} className='rounded-full border border-[#5D50C6] px-5 py-3 font-semibold text-[#5D50C6]'>Explore {destination.name}</Link>)}</div> : <p className='mt-5 text-gray-700'>Ask our team for destination guidance for your travel dates.</p>}
          </div>
        </section>
        <ContactForm />
      </article>
    </>
  )
}
