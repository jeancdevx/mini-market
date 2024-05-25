import { useEffect, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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
    const params = new URLSearchParams()

    if (categoryId) {
      params.append('categoryId', categoryId)
    }

    if (debouncedValue) {
      params.append('productName', debouncedValue)
    }

    const url = `${pathname}?${params.toString()}`

    router.push(url, { scroll: false })
  }, [debouncedValue])

  return {
    value,
    setValue
  }
}
