export const TOUR_PACKAGE_QUERY = `
  *[_type == "tourPackage" && slug.current == $slug][0]{
    title,
    slug,
    tagline,
    description,
    duration,
    price,
    minGuests,
    accommodation,
    hotel,
    locations,
    heroImage,
    galleryImages,
    itinerary,
    highlights,
    inclusions,
    exclusions,
    seo
  }
`

export const TOUR_PACKAGES_QUERY = `
  *[_type == "tourPackage" && !(_id in path("drafts.**"))] | order(price asc) {
    _id,
    title,
    slug,
    tagline,
    duration,
    price,
    heroImage
  }
`