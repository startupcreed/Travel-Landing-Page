// CMS Data Types

export interface CMSlug {
  current: string
}

export interface CMSImage {
  asset: {
    url?: string
    _ref?: string
  }
  alt?: string
}

export interface CMS_seo {
  seoTitle?: string
  seoDescription?: string
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  noindex?: boolean
  seoImage?: CMSImage
  ogImage?: CMSImage
}

export interface CMSTourPackage {
  _id: string
  title: string
  slug: CMSlug
  tagline?: string
  shortSummary?: string
  description?: string
  duration?: string
  nights?: number
  days?: number
  featured?: boolean
  price?: number
  minGuests?: string
  accommodation?: string
  hotel?: string
  locations?: string[]
  destinations?: CMSDestinationSummary[]
  categories?: CMSPackageCategory[]
  heroImage?: CMSImage
  gallery?: CMSImage[]
  itinerary?: { day: string; title: string; description: string }[]
  highlights?: string[]
  inclusions?: string[]
  exclusions?: string[]
  houseboatInformation?: string
  transportationInformation?: string
  meals?: string
  optionalActivities?: string[]
  importantNotes?: string[]
  cancellationInformation?: string
  faqs?: CMSFAQ[]
  relatedDestinations?: CMSDestinationSummary[]
  relatedPackages?: CMSTourPackageSummary[]
  _updatedAt?: string
  seo?: CMS_seo
}

export interface CMSFAQ {
  question: string
  answer?: string
}

export interface CMSPackageCategory {
  _id?: string
  title: string
  slug: CMSlug
  description?: string
}

export interface CMSTourPackageSummary {
  _id?: string
  title: string
  slug: CMSlug
  shortSummary?: string
  description?: string
  duration?: string
  days?: number
  featured?: boolean
  price?: number
  heroImage?: CMSImage
  locations?: string[]
  destinations?: CMSDestinationSummary[]
  relatedDestinations?: CMSDestinationSummary[]
  seo?: CMS_seo
}

export interface CMSDestinationSummary {
  _id?: string
  name: string
  slug: CMSlug
  heroImage?: CMSImage
}

export interface CMSDestination extends CMSDestinationSummary {
  _id: string
  discountPercentage?: string
  heroTitle?: string
  heroSubtitle?: string
  overview?: string
  bestTimeToVisit?: string
  recommendedDuration?: string
  placesToVisit?: string[]
  thingsToDo?: string[]
  howToReach?: string
  nearbyDestinations?: CMSDestinationSummary[]
  travelTips?: string[]
  packages?: CMSTourPackageSummary[]
  gallery?: CMSImage[]
  faqs?: CMSFAQ[]
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
  noindex?: boolean
  _updatedAt?: string
}

export interface CMStestimonial {
  _id: string
  name: string
  role?: string
  rating?: number
  text: string
  image?: CMSImage
}

export interface CMSService {
  _id: string
  title: string
  description?: string
  icon?: string
  image?: CMSImage
}

export interface CMContactInfo {
  phone: string
  email: string
  address: string
  whatsapp: string
}

// SEO Landing Page Types
export interface CMSSEOLandingPage {
  _id: string
  title: string
  slug: CMSlug
  focusKeyword?: string
  heroHeading?: string
  heroSubtitle?: string
  heroImage?: CMSImage
  startingPrice?: number
  duration?: string
  destinationsCovered?: string[]
  overview?: string
  shortItinerary?: {
    day: string
    title: string
    description?: string
    image?: CMSImage
  }[]
  highlights?: string[]
  inclusions?: string[]
  exclusions?: string[]
  hotelCategoryNote?: string
  bestTimeToVisit?: string
  faqs?: {
    question: string
    answer?: string
  }[]
  relatedPages?: Array<{
    _id: string
    title: string
    slug: CMSlug
    focusKeyword?: string
  }>
  ctaTitle?: string
  ctaDescription?: string
  whatsappMessageTemplate?: string
  seoTitle?: string
  seoDescription?: string
  ogImage?: CMSImage
  canonicalUrl?: string
  noindex?: boolean
}
