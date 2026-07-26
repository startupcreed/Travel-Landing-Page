import type { Metadata } from 'next'
import PackageCategoryPage from '@/components/PackageCategoryPage'
import JsonLd from '@/components/JsonLd'
import { getAllPackages } from '@/lib/content'
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/seo'
import type { CMSFAQ } from '@/lib/types'

export const revalidate = 3600
export const metadata: Metadata = pageMetadata({
  title: 'Kerala Family Tour Packages 2026 | Custom Family Holidays',
  description: 'Plan a custom Kerala family holiday with suitable durations, flexible sightseeing and practical hotel, transport and child-friendly route guidance.',
  path: '/kerala-family-tour-packages',
  image: '/packages/Popular-Kerala.webp',
})

const faqs: CMSFAQ[] = [
  { question: 'How many days work well for a Kerala family trip?', answer: 'Five to seven days gives many families a comfortable starting point, but the right duration depends on children’s ages, arrival city and the number of stops.' },
  { question: 'Can the route include rest time?', answer: 'Yes. Ask for fewer daily activities, later starts or additional nights where helpful. The final schedule should match your family’s pace.' },
  { question: 'How are child prices calculated?', answer: 'Child policies vary by age, occupancy and service provider. Share each child’s age and obtain the exact policy in the written quotation.' },
]

export default async function FamilyPage() {
  const packages = await getAllPackages()
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Kerala Family Tour Packages', path: '/kerala-family-tour-packages' }])} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PackageCategoryPage
        title='Kerala Family Tour Packages with Flexible, Comfortable Routes'
        label='Kerala Family Tour Packages'
        path='/kerala-family-tour-packages'
        intro='A good family itinerary manages road time, meal breaks, weather and the different energy levels of adults and children. Build the route around your arrival point and confirm room occupancy, child policies, vehicle details and inclusions in writing.'
        packages={packages}
        sections={[
          { title: 'Suitable Family Durations', text: 'Five to seven days can provide a balanced first visit with two or three main stops. Shorter trips benefit from a compact route, while longer holidays can add rest days or coastal time.' },
          { title: 'Child-friendly Planning', text: 'Tea landscapes, backwater scenery, gardens and suitable nature activities can appeal across age groups. Availability, safety rules and weather conditions should always be checked locally.' },
          { title: 'Transport & Hotel Guidance', text: 'Confirm vehicle capacity with luggage, room occupancy, extra-bed rules, meal plans and accessibility needs before payment. Avoid assuming that every property follows the same child policy.' },
        ]}
        faqs={faqs}
        destinationSlugs={[
          { name: 'Kochi (Cochin)', slug: 'kochi' },
          { name: 'Munnar', slug: 'munnar' },
          { name: 'Thekkady', slug: 'thekkady' },
          { name: 'Alleppey (Alappuzha)', slug: 'alleppey' },
        ]}
        whatsappMessage='Hi, I would like a customised Kerala family tour with suitable travel times and verified child policies.'
      />
    </>
  )
}
