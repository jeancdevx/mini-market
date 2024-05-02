'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'

import qs from 'query-string'

import { Search as SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/Input'
import { useDebounce } from './use-debounce.hook'

const Search = () => {
  const [value, setValue] = useState('')

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const debouncedValue = useDebounce({
    value,
    delay: 500
  })

  const categoryId = searchParams.get('categoryId')

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId,
          productName: debouncedValue
        }
      },
      {
        skipEmptyString: true,
        skipNull: true
      }
    )

    router.push(url, { scroll: false })
  }, [debouncedValue])

  return (
    <div className='relative'>
      <SearchIcon className='absolute left-3 top-3 h-4 w-4 text-primary' />

      <Input
        className='w-full rounded-md pl-9 font-medium transition focus-visible:ring-2 focus-visible:ring-purple-400 md:w-[300px]'
        placeholder='Search'
        type='search'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Search
