import Image from 'next/image'
import Link from 'next/link'
import type { CMSDestinationSummary, CMSTourPackageSummary } from '@/lib/types'
import { sanityImageUrl } from '@/lib/seo'

export function PackageLinkCard({ pkg }: { pkg: CMSTourPackageSummary }) {
  const href = `/kerala-tour-packages/${pkg.slug.current}`
  const image = sanityImageUrl(pkg.heroImage, 720, 480) || pkg.heroImage?.asset?.url
  return (
    <article className='overflow-hidden rounded-3xl bg-white shadow-lg'>
      <Link href={href} className='block'>
        <div className='relative aspect-[3/2] bg-gray-100'>
          {image && <Image src={image} alt={pkg.heroImage?.alt || pkg.title} fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover' />}
        </div>
        <div className='p-6 pb-3'>
          <h3 className='text-xl font-bold text-[#191825]'>{pkg.title}</h3>
        </div>
      </Link>
      <div className='px-6 pb-6'>
        {pkg.shortSummary && <p className='mb-3 text-sm leading-relaxed text-gray-600'>{pkg.shortSummary}</p>}
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <span className='text-sm text-gray-600'>{pkg.duration}</span>
          {typeof pkg.price === 'number' && <span className='font-bold text-[#5D50C6]'>From ₹{pkg.price.toLocaleString('en-IN')}</span>}
        </div>
        <Link href={href} className='mt-5 inline-flex rounded-xl bg-[#5D50C6] px-5 py-3 font-semibold text-white hover:bg-[#4a3fb0]'>
          View Itinerary
        </Link>
      </div>
    </article>
  )
}

export function DestinationLinkCard({ destination }: { destination: CMSDestinationSummary }) {
  const href = `/destinations/${destination.slug.current}`
  const image = sanityImageUrl(destination.heroImage, 640, 800) || destination.heroImage?.asset?.url
  return (
    <Link href={href} className='group overflow-hidden rounded-3xl bg-white shadow-lg'>
      <div className='relative aspect-[4/3] bg-gray-100'>
        {image && <Image src={image} alt={destination.heroImage?.alt || destination.name} fill sizes='(max-width: 768px) 50vw, 25vw' className='object-cover transition-transform group-hover:scale-105' />}
      </div>
      <div className='p-5'>
        <h3 className='text-xl font-bold text-[#191825]'>{destination.name}</h3>
        <span className='mt-2 inline-block font-semibold text-[#5D50C6]'>Explore {destination.name}</span>
      </div>
    </Link>
  )
}
