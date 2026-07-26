const DESTINATION_SUMMARY = `
  _id, name, slug, heroImage{..., asset->{url, metadata{dimensions}}}
`

const PACKAGE_SUMMARY = `
  _id, _updatedAt, title, slug, shortSummary, description, tagline, duration,
  days, featured, price, locations, seo,
  destinations[]->{${DESTINATION_SUMMARY}},
  relatedDestinations[]->{${DESTINATION_SUMMARY}},
  heroImage{..., asset->{url, metadata{dimensions}}}
`

export const TOUR_PACKAGE_QUERY = `
  *[_type == "tourPackage" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id, _updatedAt, title, slug, tagline, shortSummary, description,
    duration, nights, days, price, minGuests, accommodation, hotel, locations,
    heroImage{..., asset->{url, metadata{dimensions}}},
    gallery[]{..., asset->{url, metadata{dimensions}}},
    itinerary[]{day, title, description, image{..., asset->{url, metadata{dimensions}}}},
    highlights, inclusions, exclusions, houseboatInformation,
    transportationInformation, meals, optionalActivities, importantNotes,
    cancellationInformation, faqs[]{question, answer},
    categories[]->{_id, title, slug, description},
    destinations[]->{${DESTINATION_SUMMARY}},
    relatedDestinations[]->{${DESTINATION_SUMMARY}},
    relatedPackages[]->{${PACKAGE_SUMMARY}},
    seo
  }
`

export const TOUR_PACKAGES_QUERY = `
  *[_type == "tourPackage" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(featured desc, days asc, price asc) {
    ${PACKAGE_SUMMARY}, locations, nights, days, featured,
    categories[]->{_id, title, slug},
    destinations[]->{${DESTINATION_SUMMARY}}, seo
  }
`

export const TOUR_PACKAGE_SLUGS_QUERY = `
  *[_type == "tourPackage" && defined(slug.current) && !(_id in path("drafts.**")) && seo.noindex != true]{
    slug, _updatedAt
  }
`

export const DESTINATION_QUERY = `
  *[_type == "destination" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id, _updatedAt, name, slug, heroTitle, heroSubtitle,
    heroImage{..., asset->{url, metadata{dimensions}}},
    overview, bestTimeToVisit, recommendedDuration, placesToVisit, thingsToDo,
    howToReach, travelTips, gallery[]{..., asset->{url, metadata{dimensions}}},
    faqs[]{question, answer}, seoTitle, seoDescription, canonicalUrl, noindex,
    nearbyDestinations[]->{${DESTINATION_SUMMARY}},
    packages[]->{${PACKAGE_SUMMARY}}
  }
`

export const DESTINATIONS_QUERY = `
  *[_type == "destination" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(name asc) {
    ${DESTINATION_SUMMARY}, _updatedAt, heroSubtitle, overview, noindex
  }
`

export const DESTINATION_SLUGS_QUERY = `
  *[_type == "destination" && defined(slug.current) && !(_id in path("drafts.**")) && noindex != true]{
    slug, _updatedAt
  }
`

// Legacy root-level SEO landing pages remain supported.
export const SEO_LANDING_PAGE_QUERY = `
  *[_type == "seoLandingPage" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id, title, slug, focusKeyword, heroHeading, heroSubtitle, heroImage,
    startingPrice, duration, destinationsCovered, overview, shortItinerary,
    highlights, inclusions, exclusions, hotelCategoryNote, bestTimeToVisit,
    faqs, relatedPages[]->{_id, title, slug, focusKeyword},
    ctaTitle, ctaDescription, whatsappMessageTemplate, seoTitle,
    seoDescription, ogImage, canonicalUrl, noindex
  }
`

export const SEO_LANDING_PAGE_SLUGS_QUERY = `
  *[_type == "seoLandingPage" && defined(slug.current) && !(_id in path("drafts.**")) && noindex != true]{
    slug, canonicalUrl, _updatedAt
  }
`

export const ALL_SEO_LANDING_PAGES_QUERY = `
  *[_type == "seoLandingPage" && !(_id in path("drafts.**")) && noindex != true] | order(_updatedAt desc){
    _id, title, slug, focusKeyword, seoDescription
  }
`
