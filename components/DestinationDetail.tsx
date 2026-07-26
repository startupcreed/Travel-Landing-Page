import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from './Breadcrumbs'
import ContactForm from './ContactForm'
import { PackageLinkCard } from './SeoCards'
import type { CMSDestination, CMSTourPackageSummary } from '@/lib/types'
import { CONTACT_INFO } from '@/constants'
import { sanityImageUrl } from '@/lib/seo'

export default function DestinationDetail({ destination, packages }: { destination: CMSDestination; packages: CMSTourPackageSummary[] }) {
  const heroImage = sanityImageUrl(destination.heroImage, 1200, 900) || destination.heroImage?.asset?.url
  const message = encodeURIComponent(`Hi, I would like help planning a Kerala trip including ${destination.name}.`)
  return (
    <article>
      <Breadcrumbs items={[
        { name: 'Home', path: '/' },
        { name: 'Destinations', path: '/kerala-tour-packages#destinations' },
        { name: destination.name, path: `/destinations/${destination.slug.current}` },
      ]} />
      <section className='max-container padding-container grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20'>
        <div>
          <p className='mb-4 font-semibold uppercase tracking-wider text-[#F85E9F]'>Kerala destination guide</p>
          <h1 className='text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl'>{destination.heroTitle || destination.name}</h1>
          <p className='mt-6 text-lg leading-relaxed text-gray-600'>{destination.heroSubtitle}</p>
          <div className='mt-8 flex flex-wrap gap-4'>
            <a href='#contact' className='rounded-full bg-[#5D50C6] px-8 py-3 font-semibold text-white'>Plan a Trip</a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`} target='_blank' rel='noopener noreferrer' className='rounded-full bg-[#25D366] px-8 py-3 font-semibold text-white'>Ask on WhatsApp</a>
          </div>
        </div>
        {heroImage && <Image src={heroImage} alt={destination.heroImage?.alt || destination.name} width={1200} height={900} priority sizes='(max-width: 1024px) 100vw, 50vw' className='aspect-[4/3] w-full rounded-3xl object-cover' />}
      </section>
      <div className='max-container padding-container space-y-16 py-12'>
        <section><h2 className='mb-5 text-3xl font-bold'>About {destination.name}</h2><p className='max-w-4xl whitespace-pre-line text-lg leading-relaxed text-gray-700'>{destination.overview}</p></section>
        <div className='grid gap-8 md:grid-cols-2'>
          {destination.bestTimeToVisit && <section className='rounded-2xl bg-[#f9f7ff] p-7'><h2 className='text-2xl font-bold'>Best Time to Visit</h2><p className='mt-4 leading-relaxed text-gray-700'>{destination.bestTimeToVisit}</p></section>}
          {destination.recommendedDuration && <section className='rounded-2xl bg-[#f9f7ff] p-7'><h2 className='text-2xl font-bold'>Recommended Duration</h2><p className='mt-4 leading-relaxed text-gray-700'>{destination.recommendedDuration}</p></section>}
        </div>
        <div className='grid gap-12 md:grid-cols-2'>
          {destination.placesToVisit?.length && <section><h2 className='mb-5 text-3xl font-bold'>Places to Visit</h2><ul className='space-y-3'>{destination.placesToVisit.map((item) => <li key={item}>✓ {item}</li>)}</ul></section>}
          {destination.thingsToDo?.length && <section><h2 className='mb-5 text-3xl font-bold'>Things to Do</h2><ul className='space-y-3'>{destination.thingsToDo.map((item) => <li key={item}>✓ {item}</li>)}</ul></section>}
        </div>
        {destination.howToReach && <section><h2 className='mb-5 text-3xl font-bold'>How to Reach</h2><p className='max-w-4xl leading-relaxed text-gray-700'>{destination.howToReach}</p></section>}
        {destination.travelTips?.length && <section><h2 className='mb-5 text-3xl font-bold'>Travel Tips</h2><ul className='grid gap-3 md:grid-cols-2'>{destination.travelTips.map((tip) => <li key={tip} className='rounded-xl bg-white p-4 shadow-sm'>{tip}</li>)}</ul></section>}
        {destination.gallery?.length && (
          <section>
            <h2 className='mb-8 text-3xl font-bold'>{destination.name} Gallery</h2>
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {destination.gallery.slice(0, 6).map((image, index) => {
                const src = sanityImageUrl(image, 800, 600) || image.asset?.url
                return src ? <Image key={`${src}-${index}`} src={src} alt={image.alt || `${destination.name} travel image ${index + 1}`} width={800} height={600} sizes='(max-width: 640px) 100vw, 33vw' className='aspect-[4/3] w-full rounded-2xl object-cover' /> : null
              })}
            </div>
          </section>
        )}
        {packages.length > 0 && <section><h2 className='mb-8 text-3xl font-bold'>Kerala Packages Featuring {destination.name}</h2><div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>{packages.map((pkg) => <PackageLinkCard key={pkg.slug.current} pkg={pkg} />)}</div></section>}
        {destination.nearbyDestinations?.length && <section><h2 className='mb-6 text-3xl font-bold'>Nearby Kerala Destinations</h2><div className='flex flex-wrap gap-3'>{destination.nearbyDestinations.map((nearby) => <Link key={nearby.slug.current} href={`/destinations/${nearby.slug.current}`} className='rounded-full border border-[#5D50C6] px-5 py-3 font-semibold text-[#5D50C6]'>Explore {nearby.name}</Link>)}</div></section>}
        {destination.faqs?.length && <section><h2 className='mb-8 text-3xl font-bold'>{destination.name} FAQs</h2><div className='space-y-4'>{destination.faqs.map((faq) => <details key={faq.question} className='rounded-xl bg-[#f9f7ff] p-6'><summary className='cursor-pointer font-semibold'>{faq.question}</summary><p className='mt-3 text-gray-700'>{faq.answer}</p></details>)}</div></section>}
      </div>
      <ContactForm />
    </article>
  )
}
