import { defineField, defineType } from 'sanity'
import { isReservedSlug } from '../../../lib/slugs'

export default defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'planning', title: 'Travel Planning' },
    { name: 'relations', title: 'Related Content' },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Destination Name', type: 'string', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', group: 'content',
      options: { source: 'name', isUnique: (value, context) => context.defaultIsUnique(value, context) },
      validation: (Rule) => Rule.required().custom((value) =>
        !isReservedSlug(value?.current) || 'This slug is reserved for an application route.'
      ),
    }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 3, group: 'content', validation: (Rule) => Rule.required() }),
    defineField({ name: 'overview', title: 'Overview', type: 'text', rows: 6, group: 'content', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'heroImage', title: 'Hero Image', type: 'image', group: 'media', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
      validation: (Rule) => Rule.required().warning('Published destination pages should have a hero image.'),
    }),
    defineField({
      name: 'gallery', title: 'Gallery', type: 'array', group: 'media',
      of: [{ type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }],
    }),
    defineField({ name: 'bestTimeToVisit', title: 'Best Time to Visit', type: 'text', rows: 4, group: 'planning' }),
    defineField({ name: 'recommendedDuration', title: 'Recommended Duration', type: 'string', group: 'planning' }),
    defineField({ name: 'placesToVisit', title: 'Places to Visit', type: 'array', of: [{ type: 'string' }], group: 'planning' }),
    defineField({ name: 'thingsToDo', title: 'Things to Do', type: 'array', of: [{ type: 'string' }], group: 'planning' }),
    defineField({ name: 'howToReach', title: 'How to Reach', type: 'text', rows: 4, group: 'planning' }),
    defineField({ name: 'travelTips', title: 'Travel Tips', type: 'array', of: [{ type: 'string' }], group: 'planning' }),
    defineField({ name: 'nearbyDestinations', title: 'Nearby Destinations', type: 'array', of: [{ type: 'reference', to: [{ type: 'destination' }] }], group: 'relations' }),
    defineField({ name: 'packages', title: 'Recommended Packages', type: 'array', of: [{ type: 'reference', to: [{ type: 'tourPackage' }] }], group: 'relations' }),
    defineField({
      name: 'faqs', title: 'FAQs', type: 'array', group: 'content',
      of: [{ type: 'object', fields: [
        defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'answer', title: 'Answer', type: 'text', validation: (Rule) => Rule.required() }),
      ] }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo', validation: (Rule) => Rule.max(60).warning('Keep SEO titles at 60 characters or fewer.') }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, group: 'seo', validation: (Rule) => Rule.max(160).warning('Keep meta descriptions at 160 characters or fewer.') }),
    defineField({ name: 'canonicalUrl', title: 'Canonical URL', type: 'url', group: 'seo' }),
    defineField({ name: 'noindex', title: 'Noindex', type: 'boolean', initialValue: false, group: 'seo' }),
  ],
  preview: { select: { title: 'name', subtitle: 'heroSubtitle', media: 'heroImage' } },
})
