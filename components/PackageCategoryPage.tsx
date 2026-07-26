import Link from 'next/link'
import Breadcrumbs from './Breadcrumbs'
import ContactForm from './ContactForm'
import { PackageLinkCard } from './SeoCards'
import type { CMSFAQ, CMSTourPackage } from '@/lib/types'
import { CONTACT_INFO } from '@/constants'

interface Props {
  title: string
  label: string
  path: string
  intro: string
  sections: { title: string; text: string }[]
  packages: CMSTourPackage[]
  faqs: CMSFAQ[]
  destinationSlugs: { name: string; slug: string }[]
  whatsappMessage: string
}

export default function PackageCategoryPage(props: Props) {
  return (
    <article>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: props.label, path: props.path }]} />
      <section className='max-container padding-container py-12 text-center lg:py-20'>
        <p className='font-semibold uppercase tracking-wider text-[#F85E9F]'>Custom Kerala holidays</p>
        <h1 className='mx-auto mt-4 max-w-5xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl'>{props.title}</h1>
        <p className='mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600'>{props.intro}</p>
        <div className='mt-8 flex flex-wrap justify-center gap-4'>
          <a href='#contact' className='rounded-full bg-[#5D50C6] px-8 py-3 font-semibold text-white'>Request a Custom Quote</a>
          <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(props.whatsappMessage)}`} target='_blank' rel='noopener noreferrer' className='rounded-full bg-[#25D366] px-8 py-3 font-semibold text-white'>Discuss on WhatsApp</a>
        </div>
      </section>
      <section className='max-container padding-container py-16'>
        <h2 className='mb-10 text-3xl font-bold'>Recommended Kerala Itineraries</h2>
        {props.packages.length ? (
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>{props.packages.map((pkg) => <PackageLinkCard key={pkg.slug.current} pkg={pkg} />)}</div>
        ) : (
          <p className='text-gray-700'>Approved itineraries are being prepared. Use the enquiry or WhatsApp option above for a custom route.</p>
        )}
      </section>
      <section className='bg-[#f9f7ff] py-16'>
        <div className='max-container padding-container grid gap-8 lg:grid-cols-3'>
          {props.sections.map((section) => <div key={section.title} className='rounded-2xl bg-white p-7'><h2 className='text-2xl font-bold'>{section.title}</h2><p className='mt-4 leading-relaxed text-gray-700'>{section.text}</p></div>)}
        </div>
      </section>
      <section className='max-container padding-container py-16'>
        <h2 className='text-3xl font-bold'>Related Kerala Destinations</h2>
        {props.destinationSlugs.length ? <div className='mt-6 flex flex-wrap gap-3'>{props.destinationSlugs.map((destination) => <Link key={destination.slug} href={`/destinations/${destination.slug}`} className='rounded-full border border-[#5D50C6] px-5 py-3 font-semibold text-[#5D50C6]'>Explore {destination.name}</Link>)}</div> : <p className='mt-6 text-gray-700'>Destination guidance is available with a custom enquiry.</p>}
        <h2 className='mb-8 mt-14 text-3xl font-bold'>Frequently Asked Questions</h2>
        <div className='space-y-4'>{props.faqs.map((faq) => <details key={faq.question} className='rounded-xl bg-white p-6 shadow'><summary className='cursor-pointer font-semibold'>{faq.question}</summary><p className='mt-3 text-gray-700'>{faq.answer}</p></details>)}</div>
      </section>
      <ContactForm />
    </article>
  )
}
