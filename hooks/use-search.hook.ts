import { useEffect, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import qs from 'query-string'

import { useDebounce } from '@/hooks/use-debounce.hook'

export const useSearch = () => {
  const [value, setValue] = useState('')

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const debouncedValue = useDebounce({
    value,
    delay: 300
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

  return {
    value,
    setValue
  }
}
