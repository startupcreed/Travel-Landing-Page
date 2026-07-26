import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from './Breadcrumbs'
import ContactForm from './ContactForm'
import { PackageLinkCard } from './SeoCards'
import type { CMSTourPackage } from '@/lib/types'
import { CONTACT_INFO } from '@/constants'
import { sanityImageUrl } from '@/lib/seo'

function ListSection({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <section>
      <h2 className='mb-5 text-3xl font-bold text-[#191825]'>{title}</h2>
      <ul className='grid gap-3 md:grid-cols-2'>
        {items.map((item) => <li key={item} className='rounded-xl bg-white p-4 shadow-sm'>✓ {item}</li>)}
      </ul>
    </section>
  )
}

export default function PackageDetail({ pkg }: { pkg: CMSTourPackage }) {
  const heroImage = sanityImageUrl(pkg.heroImage, 1200, 900) || pkg.heroImage?.asset?.url
  const destinations = pkg.relatedDestinations?.length ? pkg.relatedDestinations : pkg.destinations
  const whatsappMessage = encodeURIComponent(`Hi, I would like a verified quotation for ${pkg.title}.`)

  return (
    <article>
      <Breadcrumbs items={[
        { name: 'Home', path: '/' },
        { name: 'Kerala Tour Packages', path: '/kerala-tour-packages' },
        { name: pkg.title, path: `/kerala-tour-packages/${pkg.slug.current}` },
      ]} />
      <section className='max-container padding-container grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20'>
        <div>
          <p className='mb-4 font-semibold uppercase tracking-wider text-[#F85E9F]'>Custom Kerala itinerary</p>
          <h1 className='text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl'>{pkg.title}</h1>
          <p className='mt-6 max-w-2xl text-lg leading-relaxed text-gray-600'>{pkg.shortSummary || pkg.tagline}</p>
          <div className='mt-6 flex flex-wrap gap-3'>
            {pkg.duration && <span className='rounded-full bg-[#f3f0ff] px-4 py-2 text-[#5D50C6]'>{pkg.duration}</span>}
            {pkg.locations?.map((location) => <span key={location} className='rounded-full bg-gray-100 px-4 py-2'>{location}</span>)}
          </div>
          {typeof pkg.price === 'number' && (
            <p className='mt-6 text-3xl font-bold text-[#5D50C6]'>From ₹{pkg.price.toLocaleString('en-IN')} <span className='text-sm font-normal text-gray-500'>per person</span></p>
          )}
          <div className='mt-8 flex flex-wrap gap-4'>
            <a href='#contact' className='rounded-full bg-[#5D50C6] px-8 py-3 font-semibold text-white'>Request a Quotation</a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappMessage}`} target='_blank' rel='noopener noreferrer' className='rounded-full bg-[#25D366] px-8 py-3 font-semibold text-white'>Discuss on WhatsApp</a>
          </div>
        </div>
        {heroImage && (
          <Image src={heroImage} alt={pkg.heroImage?.alt || pkg.title} width={1200} height={900} priority sizes='(max-width: 1024px) 100vw, 50vw' className='aspect-[4/3] w-full rounded-3xl object-cover' />
        )}
      </section>

      <div className='max-container padding-container space-y-16 py-12'>
        {pkg.description && <section><h2 className='mb-5 text-3xl font-bold'>Package Overview</h2><p className='max-w-4xl whitespace-pre-line text-lg leading-relaxed text-gray-700'>{pkg.description}</p></section>}
        <ListSection title='Package Highlights' items={pkg.highlights} />
        {pkg.itinerary?.length ? (
          <section>
            <h2 className='mb-8 text-3xl font-bold'>Day-wise Itinerary</h2>
            <div className='space-y-5'>
              {pkg.itinerary.map((day) => (
                <div key={`${day.day}-${day.title}`} className='rounded-2xl bg-[#f9f7ff] p-6'>
                  <h3 className='text-xl font-bold text-[#5D50C6]'>{day.day}: {day.title}</h3>
                  {day.description && <p className='mt-3 leading-relaxed text-gray-700'>{day.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className='rounded-2xl border border-[#5D50C6]/20 bg-[#f9f7ff] p-6'>
            <h2 className='text-2xl font-bold'>Day-wise itinerary</h2>
            <p className='mt-3 text-gray-700'>The detailed itinerary is awaiting CMS review. Request a current, verified route plan for your dates.</p>
          </section>
        )}
        <div className='grid gap-12 lg:grid-cols-2'>
          <ListSection title='Inclusions' items={pkg.inclusions} />
          <ListSection title='Exclusions' items={pkg.exclusions} />
        </div>
        {(pkg.hotel || pkg.accommodation || pkg.houseboatInformation || pkg.transportationInformation || pkg.meals) && (
          <section>
            <h2 className='mb-6 text-3xl font-bold'>Stay, Houseboat, Transport & Meals</h2>
            <div className='grid gap-5 md:grid-cols-2'>
              {(pkg.hotel || pkg.accommodation) && <div className='rounded-2xl bg-white p-6 shadow'><h3 className='font-bold'>Accommodation</h3><p className='mt-2 text-gray-700'>{pkg.hotel || pkg.accommodation}</p></div>}
              {pkg.houseboatInformation && <div className='rounded-2xl bg-white p-6 shadow'><h3 className='font-bold'>Houseboat information</h3><p className='mt-2 text-gray-700'>{pkg.houseboatInformation}</p></div>}
              {pkg.transportationInformation && <div className='rounded-2xl bg-white p-6 shadow'><h3 className='font-bold'>Transportation</h3><p className='mt-2 text-gray-700'>{pkg.transportationInformation}</p></div>}
              {pkg.meals && <div className='rounded-2xl bg-white p-6 shadow'><h3 className='font-bold'>Meals</h3><p className='mt-2 text-gray-700'>{pkg.meals}</p></div>}
            </div>
          </section>
        )}
        <ListSection title='Optional Activities' items={pkg.optionalActivities} />
        <ListSection title='Important Notes' items={pkg.importantNotes} />
        {pkg.gallery?.length && (
          <section>
            <h2 className='mb-8 text-3xl font-bold'>Package Gallery</h2>
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {pkg.gallery.slice(0, 6).map((image, index) => {
                const src = sanityImageUrl(image, 800, 600) || image.asset?.url
                return src ? <Image key={`${src}-${index}`} src={src} alt={image.alt || `${pkg.title} gallery image ${index + 1}`} width={800} height={600} sizes='(max-width: 640px) 100vw, 33vw' className='aspect-[4/3] w-full rounded-2xl object-cover' /> : null
              })}
            </div>
          </section>
        )}
        {pkg.cancellationInformation && <section><h2 className='mb-4 text-3xl font-bold'>Cancellation Information</h2><p className='text-gray-700'>{pkg.cancellationInformation}</p></section>}
        {destinations?.length && (
          <section>
            <h2 className='mb-6 text-3xl font-bold'>Destinations on this Kerala route</h2>
            <div className='flex flex-wrap gap-3'>
              {destinations.map((destination) => <Link key={destination.slug.current} href={`/destinations/${destination.slug.current}`} className='rounded-full border border-[#5D50C6] px-5 py-3 font-semibold text-[#5D50C6]'>Explore {destination.name}</Link>)}
            </div>
          </section>
        )}
        {pkg.relatedPackages?.length && <section><h2 className='mb-8 text-3xl font-bold'>Related Kerala Packages</h2><div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>{pkg.relatedPackages.map((item) => <PackageLinkCard key={item.slug.current} pkg={item} />)}</div></section>}
        {pkg.faqs?.length && (
          <section>
            <h2 className='mb-8 text-3xl font-bold'>Frequently Asked Questions</h2>
            <div className='space-y-4'>{pkg.faqs.map((faq) => <details key={faq.question} className='rounded-xl bg-[#f9f7ff] p-6'><summary className='cursor-pointer font-semibold'>{faq.question}</summary><p className='mt-3 text-gray-700'>{faq.answer}</p></details>)}</div>
          </section>
        )}
      </div>
      <ContactForm />
    </article>
  )
}
