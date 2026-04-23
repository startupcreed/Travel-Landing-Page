import { client } from '@/lib/sanityClient'
import { TOUR_PACKAGE_QUERY } from '@/lib/queries'

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await client.fetch(TOUR_PACKAGE_QUERY, {
    slug: params.slug,
  })

  if (!data) return <div>Not Found</div>

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.tagline}</p>
      <p>₹{data.price}</p>
    </div>
  )
}