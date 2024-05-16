'use client'

import Link from 'next/link'

import Heading from '@/components/Heading'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'

import { categoryColumns, type CategoryColumn } from './CategoryColumns'

interface CategoryClientProps {
  categories: CategoryColumn[]
}

const CategoryClient = ({ categories }: CategoryClientProps) => {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex w-full items-center justify-between'>
        <Heading title='Categories' description='Manage your categories here' />

        <Link href='/categories/create'>
          <Button>Create</Button>
        </Link>
      </div>

      <DataTable
        columns={categoryColumns}
        data={categories}
        searchKey='name'
        searchPlaceholder='Search categories'
      />
    </div>
  )
}

export default CategoryClient
