import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'defaultSeoTitle', title: 'Default SEO Title', type: 'string', validation: (Rule) => Rule.max(60).warning('Keep SEO titles at 60 characters or fewer.') }),
    defineField({ name: 'defaultSeoDescription', title: 'Default SEO Description', type: 'text', validation: (Rule) => Rule.max(160).warning('Keep meta descriptions at 160 characters or fewer.') }),
    defineField({ name: 'defaultOgImage', title: 'Default Social Image', type: 'image' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string' }),
  ],
})
