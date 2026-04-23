// Stub for urlFor - will work when Sanity is properly configured
// Current client is a stub without proper fetch

export function urlFor(source: any) {
  return {
    url: () => source?.asset?.url || ''
  }
}