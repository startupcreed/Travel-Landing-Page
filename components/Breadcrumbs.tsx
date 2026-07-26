import Link from 'next/link'
import type { BreadcrumbItem } from '@/lib/seo'

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label='Breadcrumb' className='max-container padding-container pt-6'>
      <ol className='flex flex-wrap items-center gap-2 text-sm text-gray-600'>
        {items.map((item, index) => (
          <li key={item.path} className='flex items-center gap-2'>
            {index > 0 && <span aria-hidden='true'>/</span>}
            {index === items.length - 1 ? (
              <span aria-current='page' className='text-[#191825]'>{item.name}</span>
            ) : (
              <Link href={item.path} className='hover:text-[#5D50C6]'>{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
