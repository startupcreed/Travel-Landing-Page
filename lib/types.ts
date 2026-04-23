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
  metaTitle?: string
  metaDescription?: string
  ogImage?: CMSImage
}

export interface CMSTourPackage {
  _id: string
  title: string
  slug: CMSlug
  tagline?: string
  description?: string
  duration?: string
  price?: number
  minGuests?: string
  accommodation?: string
  hotel?: string
  locations?: string[]
  heroImage?: CMSImage
  galleryImages?: CMSImage[]
  itinerary?: { day: string; title: string; description: string }[]
  highlights?: string[]
  inclusions?: string[]
  exclusions?: string[]
  seo?: CMS_seo
}

export interface CMSDestination {
  _id: string
  name: string
  slug: CMSlug
  discountPercentage?: string
  heroImage?: CMSImage
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