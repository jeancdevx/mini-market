'use client'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { useQueryString } from '@/hooks/use-query-string.hook'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/Pagination'

interface CategoriesProps {
  categories: Array<{ id: string; name: string; createdAt: string }>
}

const Categories = ({ categories }: CategoriesProps) => {
  const { pathname, createQueryString, removeQueryString } = useQueryString()
  const searchParams = useSearchParams()

  const categoryId = searchParams.get('categoryId')

  const paginatePrevious = () => {
    if (categories.length === 0) {
      return pathname
    }

    const skip = searchParams.get('skip')
    const take = searchParams.get('take')

    if (!skip || !take) {
      return `${pathname}${categoryId ? `?categoryId=${categoryId}` : ''}`
    }

    const newSkip = parseInt(skip) - 5

    if (newSkip < 0) {
      return `${pathname}${categoryId ? `?categoryId=${categoryId}` : ''}`
    } else {
      return `${pathname}?take=5&skip=${newSkip}${categoryId ? `&categoryId=${categoryId}` : ''}`
    }
  }

  const paginateNext = () => {
    if (categories.length === 0) {
      return pathname
    }

    const skip = searchParams.get('skip')
    const take = searchParams.get('take')

    if (!skip || !take) {
      return `${pathname}?take=5&skip=5${categoryId ? `&categoryId=${categoryId}` : ''}`
    }

    const newSkip = parseInt(skip) + 5

    if (categories.length < 5) {
      return `${pathname}${categoryId ? `?categoryId=${categoryId}` : ''}`
    } else {
      return `${pathname}?take=5&skip=${newSkip}${categoryId ? `&categoryId=${categoryId}` : ''}`
    }
  }

  return (
    <Pagination>
      <PaginationContent className='hidden w-full justify-center space-x-4 md:flex'>
        <PaginationItem>
          <PaginationPrevious
            href={paginatePrevious()}
            className={cn(
              'w-full',
              searchParams.get('skip') === '0' ||
                (searchParams.get('skip') === null &&
                  'pointer-events-none opacity-50')
            )}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={pathname}
            className='w-full px-2 text-sm font-bold'
            onClick={() => removeQueryString('categoryId')}
          >
            All
          </PaginationLink>
        </PaginationItem>

        {categories.map(category => (
          <PaginationItem key={category.id}>
            <PaginationLink
              href={
                pathname + '?' + createQueryString('categoryId', category.id)
              }
              className='w-full px-2 text-sm font-semibold'
            >
              {category.name}
            </PaginationLink>
          </PaginationItem>
        ))}

        {categories.length === 0 && (
          <PaginationItem>
            <Pagination className='pointer-events-none w-full opacity-50'>
              No categories found
            </Pagination>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={paginateNext()}
            className={cn(
              'w-full',
              categories.length === 0 && 'pointer-events-none opacity-50'
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Categories
