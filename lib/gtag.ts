type DataLayerEvent = {
  event: string
  event_category?: string
  event_label?: string
}

type DataLayerWindow = Window & {
  dataLayer?: DataLayerEvent[]
}

export function trackLeadFormConversion() {
  if (typeof window === 'undefined') {
    return
  }

  const trackingWindow = window as DataLayerWindow

  trackingWindow.dataLayer = trackingWindow.dataLayer || []

  trackingWindow.dataLayer.push({
    event: 'conversion_event_submit_lead_form',
    event_category: 'lead',
    event_label: 'submit_lead_form',
  })
}
