'use client'

import Link from 'next/link'

import Heading from '@/components/Heading'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'

import { productColumns, type ProductColumn } from './ProductColumns'

interface ProductClientProps {
  products: ProductColumn[]
}

const ProductClient = ({ products }: ProductClientProps) => {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex w-full items-center justify-between'>
        <Heading
          title='Products'
          description='Manage your products here'
        />

        <Link href='/products/create'>
          <Button>Create</Button>
        </Link>
      </div>

      <DataTable
        columns={productColumns}
        data={products}
        searchKey='name'
        searchPlaceholder='Search Categories'
      />
    </div>
  )
}

export default ProductClient
