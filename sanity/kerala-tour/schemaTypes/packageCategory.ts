import { defineField, defineType } from 'sanity'
import { isReservedSlug } from '../../../lib/slugs'

export default defineType({
  name: 'packageCategory',
  title: 'Package Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', isUnique: (value, context) => context.defaultIsUnique(value, context) },
      validation: (Rule) => Rule.required().custom((value) =>
        !isReservedSlug(value?.current) || 'This slug is reserved for an application route.'
      ),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
})
