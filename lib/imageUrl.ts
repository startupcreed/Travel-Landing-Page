import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanityClient'

// Build image URLs using Sanity's official image builder
const builder = imageUrlBuilder(client as any)

const emptyImageUrlBuilder = {
  width: () => emptyImageUrlBuilder,
  height: () => emptyImageUrlBuilder,
  url: () => '',
}

function fallbackImageUrlBuilder(url: string) {
  const fallbackBuilder = {
    width: () => fallbackBuilder,
    height: () => fallbackBuilder,
    url: () => url,
  }

  return fallbackBuilder
}

export function urlFor(source: any) {
  if (!source) {
    return emptyImageUrlBuilder
  }
  
  try {
    return builder.image(source)
  } catch (error) {
    // Fallback if client is not properly configured
    return fallbackImageUrlBuilder(source?.asset?.url || '')
  }
}
