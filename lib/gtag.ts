type GtagWindow = Window & {
  gtag?: (
    command: 'event',
    eventName: string,
    eventParams: {
      event_category: string
      event_label: string
    }
  ) => void
}

export function trackLeadFormConversion() {
  if (typeof window === 'undefined') {
    return
  }

  const gtag = (window as GtagWindow).gtag

  if (typeof gtag !== 'function') {
    return
  }

  try {
    gtag('event', 'conversion_event_submit_lead_form_1', {
      event_category: 'lead',
      event_label: 'submit_lead_form',
    })
  } catch (error) {
    // Conversion tracking must never interrupt the lead flow.
  }
}
