'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import { AspectRatio } from '../ui/AspectRatio'
import { Badge } from '../ui/Badge'
import ProductCellAction from './ProductCellAction'

export interface ProductColumn {
  id: string
  name: string
  image: string
  stock: number
  price: number
  category: string
  createdAt: string
}

export const productColumns: Array<ColumnDef<ProductColumn>> = [
  {
    accessorKey: 'image',
    header: () => {
      return <div className='flex justify-center'>Image</div>
    },
    cell: ({ row }) => (
      <AspectRatio ratio={1}>
        <Image
          src={row.original.image}
          alt={row.original.name}
          fill
          className='h-8 w-8 object-contain'
        />
      </AspectRatio>
    )
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className='flex justify-center'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='font-semibold'
          >
            Name
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className='flex justify-center font-semibold'>
        {row.original.name}
      </div>
    )
  },
  {
    accessorKey: 'category',
    header: () => {
      return <div className='flex justify-center'>Category</div>
    },
    cell: ({ row }) => (
      <div className='flex justify-center'>
        <Badge>{row.original.category}</Badge>
      </div>
    )
  },
  {
    accessorKey: 'stock',
    header: () => {
      return <div className='flex justify-center'>Stock</div>
    },
    cell: ({ row }) => (
      <div className='flex justify-center'>{row.original.stock}</div>
    )
  },
  {
    accessorKey: 'price',
    header: () => {
      return <div className='flex justify-center'>Price</div>
    },
    cell: ({ row }) => (
      <div className='flex justify-center'>
        {formatCurrency(row.original.price)}
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: () => {
      return <div className='flex justify-center'>Date</div>
    },
    cell: ({ row }) => (
      <div className='flex justify-center'>{row.original.createdAt}</div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <ProductCellAction data={row.original} />
      </div>
    )
  }
]
