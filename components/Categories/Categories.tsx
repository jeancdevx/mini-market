'use client'

import Link from 'next/link'

import { useQueryString } from '@/hooks/use-query-string.hook'

import { Button } from '@/components/ui/Button'

interface CategoriesProps {
  categories: Array<{ id: string; name: string; createdAt: string }>
}

const Categories = ({ categories }: CategoriesProps) => {
  const { pathname, createQueryString, removeQueryString } = useQueryString()

  return (
    <div className='hidden w-full flex-1 gap-x-2 overflow-hidden md:flex'>
      <Link href={pathname + '?' + removeQueryString('categoryId')}>
        <Button variant='secondary' size='sm' className='font-semibold'>
          Clear
        </Button>
      </Link>

      {categories.map(({ id, name }) => (
        <Link
          key={id}
          href={pathname + '?' + createQueryString('categoryId', id)}
        >
          <Button variant='secondary' size='sm' className='font-semibold'>
            {name}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export default Categories
