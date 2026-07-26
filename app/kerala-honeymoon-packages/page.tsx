import type { Metadata } from 'next'
import PackageCategoryPage from '@/components/PackageCategoryPage'
import JsonLd from '@/components/JsonLd'
import { getAllPackages } from '@/lib/content'
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/seo'
import type { CMSFAQ } from '@/lib/types'

export const revalidate = 3600
export const metadata: Metadata = pageMetadata({
  title: 'Kerala Honeymoon Packages 2026 | Munnar & Houseboat Trips',
  description: 'Plan a customised Kerala honeymoon with Munnar, Alleppey backwaters and relaxed couple-friendly routes. Verify stays and houseboat inclusions in your quote.',
  path: '/kerala-honeymoon-packages',
  image: '/packages/Romantic-Kerala.webp',
})

const faqs: CMSFAQ[] = [
  { question: 'Can we request a private houseboat?', answer: 'Yes, but privacy, boat category, route, meals and operating details must be explicitly confirmed in your written quotation.' },
  { question: 'Which Kerala destinations work well for couples?', answer: 'Munnar and Alleppey are common choices. Thekkady, Kovalam and Varkala can be added where the available duration and preferred pace allow.' },
  { question: 'Are romantic decorations included?', answer: 'They are not assumed. Request any celebration setup separately and confirm the exact arrangement and cost before booking.' },
]

export default async function HoneymoonPage() {
  const packages = await getAllPackages()
  const selected = packages.filter((pkg) => pkg.slug.current.includes('honeymoon') || pkg.tagline?.toLowerCase().includes('romantic'))
  const listings = selected.length ? selected : packages
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Kerala Honeymoon Packages', path: '/kerala-honeymoon-packages' }])} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PackageCategoryPage
        title='Kerala Honeymoon Packages for Munnar, Backwaters & the Coast'
        label='Kerala Honeymoon Packages'
        path='/kerala-honeymoon-packages'
        intro='Plan a couple-focused Kerala holiday with time to enjoy the hill country, backwaters and coast without turning every day into a long transfer. Accommodation, houseboat privacy, meals and celebration arrangements are confirmed only in the written quotation.'
        packages={listings}
        sections={[
          { title: 'Romantic Kerala Routes', text: 'Munnar and Alleppey form a popular hill-and-backwater combination. With more time, Thekkady, Kovalam or Varkala can add nature or coastal stays while keeping the route comfortable.' },
          { title: 'Private Houseboat Guidance', text: 'Ask for the exact boat type, privacy arrangement, room configuration, cruise schedule and meal plan. A “houseboat included” label alone does not confirm these details.' },
          { title: 'Planning for Couples', text: 'Balance sightseeing with unhurried time, disclose celebration requests early and verify every paid extra. Route choices should reflect arrival point, weather and the couple’s preferred pace.' },
        ]}
        faqs={faqs}
        destinationSlugs={[
          { name: 'Munnar', slug: 'munnar' },
          { name: 'Alleppey (Alappuzha)', slug: 'alleppey' },
          { name: 'Thekkady', slug: 'thekkady' },
        ]}
        whatsappMessage='Hi, I would like a customised Kerala honeymoon itinerary with verified stay and houseboat details.'
      />
    </>
  )
}
