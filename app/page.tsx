import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import TourPackages from '@/components/TourPackages'
import Destination from '@/components/Destination'
import TravelPoint from '@/components/TravelPoint'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import JsonLd from '@/components/JsonLd'
import { TOUR_PACKAGES } from '@/constants'
import { client } from '@/lib/sanityClient'
import { urlFor } from '@/lib/imageUrl'
import { absoluteUrl, pageMetadata, sanityImageUrl } from '@/lib/seo'
import { getAllPackages } from '@/lib/content'

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]`
async function getHomepage() {
  try {
    return await client.fetch(HOMEPAGE_QUERY)
  } catch {
    return null
  }
}

export async function generateMetadata() {
  const data = await getHomepage()
  return pageMetadata({
    title: data?.seoTitle || 'Kerala Tour Packages for Couples & Families | BH Holidays',
    description: data?.seoDescription || 'Plan customised Kerala tour packages covering Munnar, Alleppey, Thekkady and Kochi with BH Holidays.',
    path: '/',
    image: data?.heroImage || '/img/KeralaTravelPackage.webp',
  })
}

async function FeaturedTours() {
  const tours = (await getAllPackages()).slice(0, 3)
  if (!tours?.length) return null
  return (
    <section className='max-container padding-container flex flex-col gap-12 py-20'>
      <h2 className='text-center text-3xl font-bold text-[#191825]'>Featured Tour Packages</h2>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        {tours.map((tour) => (
          <article key={tour._id} className='overflow-hidden rounded-3xl bg-white shadow-lg'>
            <Link href={`/kerala-tour-packages/${tour.slug.current}`} className='block'>
              <div className='relative h-48'>
                {tour.heroImage ? <Image src={sanityImageUrl(tour.heroImage, 720, 480)} alt={tour.heroImage.alt || tour.title} fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover' /> : <div className='h-full bg-gray-200' />}
              </div>
              <div className='p-5'>
                <h3 className='text-lg font-bold text-[#191825]'>{tour.title}</h3>
                <p className='mt-1 text-sm text-gray-600'>{tour.duration}</p>
                {typeof tour.price === 'number' && <p className='mt-2 text-xl font-bold text-[#5D50C6]'>From ₹{tour.price.toLocaleString('en-IN')}</p>}
                <span className='mt-4 inline-block font-semibold text-[#5D50C6]'>View Itinerary →</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default async function Home() {
  const data = await getHomepage()
  const cmsHeroData = data ? {
    title: data.heroTitle,
    subtitle: data.heroSubtitle,
    exploreText: data.ctaText,
    heroImage: data.heroImage ? { asset: { url: urlFor(data.heroImage).url() } } : undefined,
  } : undefined

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebPage', name: data?.seoTitle || data?.heroTitle || 'Kerala Tour Packages', url: absoluteUrl('/') }} />
      <Hero cmsData={cmsHeroData} title={data?.heroTitle} subtitle={data?.heroSubtitle} exploreText={data?.ctaText} packages={TOUR_PACKAGES} />
      <section className='max-container padding-container pt-8 text-center'>
        <Link href='/kerala-tour-packages' className='inline-flex rounded-full bg-[#5D50C6] px-8 py-3 font-semibold text-white'>Explore All Kerala Tour Packages</Link>
      </section>
      <FeaturedTours />
      <TourPackages packages={TOUR_PACKAGES} />
      <Destination />
      <Services />
      <TravelPoint />
      <Testimonials />
      <ContactForm />
    </>
  )
}
