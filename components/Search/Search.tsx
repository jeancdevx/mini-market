'use client'

import { Search as SearchIcon } from 'lucide-react'

import { useSearch } from '@/hooks/use-search.hook'

import { Input } from '@/components/ui/Input'

const Search = () => {
  const { value, setValue } = useSearch()

  return (
    <div className='relative'>
      <SearchIcon className='absolute left-3 top-3 h-4 w-4 text-primary' />

      <Input
        className='w-full rounded-md pl-9 font-medium transition focus-visible:ring-2 focus-visible:ring-purple-100 md:w-[300px]'
        placeholder='Search'
        type='search'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export default Search
