import { defineField, defineType } from 'sanity'
import { isReservedSlug } from '../../../lib/slugs'

const stringList = (name: string, title: string, group: string) =>
  defineField({ name, title, type: 'array', of: [{ type: 'string' }], group })

export default defineType({
  name: 'tourPackage',
  title: 'Tour Package',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info' },
    { name: 'pricing', title: 'Pricing & Duration' },
    { name: 'media', title: 'Media' },
    { name: 'content', title: 'Content' },
    { name: 'itinerary', title: 'Itinerary' },
    { name: 'location', title: 'Location & Travel' },
    { name: 'seo', title: 'SEO' },
    { name: 'cta', title: 'Lead Generation' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Package Title', type: 'string', group: 'basic', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug', title: 'URL Slug', type: 'slug', group: 'basic',
      options: { source: 'title', maxLength: 96, isUnique: (value, context) => context.defaultIsUnique(value, context) },
      validation: (Rule) => Rule.required().custom((value) =>
        !isReservedSlug(value?.current) || 'This slug is reserved for an application route.'
      ),
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'basic' }),
    defineField({ name: 'shortSummary', title: 'Short Summary', type: 'text', rows: 3, group: 'basic', validation: (Rule) => Rule.required().warning('Published package pages should have a summary. Existing documents remain valid.') }),
    defineField({ name: 'description', title: 'Overview', type: 'text', rows: 6, group: 'basic' }),
    defineField({ name: 'categories', title: 'Package Categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'packageCategory' }] }], group: 'basic' }),
    defineField({ name: 'featured', title: 'Featured Package', type: 'boolean', initialValue: false, group: 'basic' }),

    defineField({ name: 'price', title: 'Starting Price (INR)', type: 'number', group: 'pricing', validation: (Rule) => Rule.min(0), description: 'Only enter a verified visible price.' }),
    defineField({ name: 'discountPrice', title: 'Legacy Discount Price (INR)', type: 'number', group: 'pricing', validation: (Rule) => Rule.min(0), hidden: true }),
    defineField({ name: 'duration', title: 'Duration', type: 'string', group: 'pricing', validation: (Rule) => Rule.custom((value) => !value || /\d/.test(value) || 'Duration should contain a number of days or nights.') }),
    defineField({ name: 'nights', title: 'Nights', type: 'number', group: 'pricing', validation: (Rule) => Rule.integer().min(0) }),
    defineField({ name: 'days', title: 'Days', type: 'number', group: 'pricing', validation: (Rule) => Rule.integer().min(1) }),
    defineField({ name: 'minGuests', title: 'Minimum Guests', type: 'string', group: 'pricing' }),

    defineField({
      name: 'heroImage', title: 'Hero Image', type: 'image', group: 'media', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
      validation: (Rule) => Rule.required().warning('Published package pages should have a hero image.'),
    }),
    defineField({
      name: 'gallery', title: 'Gallery Images', type: 'array', group: 'media',
      of: [{ type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }],
    }),

    stringList('highlights', 'Highlights', 'content'),
    stringList('inclusions', 'Inclusions', 'content'),
    stringList('exclusions', 'Exclusions', 'content'),
    stringList('optionalActivities', 'Optional Activities', 'content'),
    stringList('importantNotes', 'Important Notes', 'content'),
    defineField({ name: 'cancellationInformation', title: 'Cancellation Information', type: 'text', rows: 4, group: 'content', description: 'Leave empty until commercial terms are approved.' }),
    defineField({
      name: 'faqs', title: 'FAQs', type: 'array', group: 'content',
      of: [{ type: 'object', fields: [
        defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'answer', title: 'Answer', type: 'text', validation: (Rule) => Rule.required() }),
      ] }],
    }),
    defineField({ name: 'relatedPackages', title: 'Related Packages', type: 'array', of: [{ type: 'reference', to: [{ type: 'tourPackage' }] }], group: 'content' }),

    defineField({
      name: 'itinerary', title: 'Day-wise Itinerary', type: 'array', group: 'itinerary',
      of: [{ type: 'object', fields: [
        defineField({ name: 'day', title: 'Day', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
      ], preview: { select: { title: 'day', subtitle: 'title' } } }],
    }),

    stringList('locations', 'Legacy Destination Names', 'location'),
    defineField({ name: 'destinations', title: 'Destination References', type: 'array', of: [{ type: 'reference', to: [{ type: 'destination' }] }], group: 'location', description: 'Preferred structured relationship; legacy locations remains supported.' }),
    defineField({ name: 'relatedDestinations', title: 'Related Destinations', type: 'array', of: [{ type: 'reference', to: [{ type: 'destination' }] }], group: 'location' }),
    defineField({ name: 'startingPoint', title: 'Starting Point', type: 'string', group: 'location' }),
    defineField({ name: 'endingPoint', title: 'Ending Point', type: 'string', group: 'location' }),
    defineField({ name: 'accommodation', title: 'Accommodation', type: 'string', group: 'location' }),
    defineField({ name: 'hotel', title: 'Hotel Category Information', type: 'string', group: 'location' }),
    defineField({ name: 'houseboatInformation', title: 'Houseboat Information', type: 'text', rows: 4, group: 'location' }),
    defineField({ name: 'transportationInformation', title: 'Transportation Information', type: 'text', rows: 4, group: 'location' }),
    defineField({ name: 'meals', title: 'Meals', type: 'text', rows: 3, group: 'location' }),

    defineField({
      name: 'seo', title: 'SEO Settings', type: 'object', group: 'seo',
      fields: [
        defineField({ name: 'seoTitle', title: 'Meta Title', type: 'string', validation: (Rule) => Rule.max(60).warning('Keep SEO titles at 60 characters or fewer.') }),
        defineField({ name: 'seoDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (Rule) => Rule.max(160).warning('Keep meta descriptions at 160 characters or fewer.') }),
        defineField({ name: 'seoImage', title: 'Social Share Image', type: 'image' }),
        defineField({ name: 'canonicalUrl', title: 'Canonical URL', type: 'url' }),
        defineField({ name: 'noindex', title: 'Noindex', type: 'boolean', initialValue: false }),
      ],
    }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', group: 'cta', initialValue: 'Get a Quote' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'duration', media: 'heroImage' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle || 'Tour Package' }
    },
  },
})
