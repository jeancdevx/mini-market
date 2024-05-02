'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import CategoryCellAction from './CategoryCellAction'

export interface CategoryColumn {
  id: string
  name: string
  createdAt: string
}

export const categoryColumns: Array<ColumnDef<CategoryColumn>> = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className='flex'>
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
      <div className='flex pl-4 font-medium'>{row.original.name}</div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return <div className='flex w-2/4 justify-center'>Date</div>
    },
    cell: ({ row }) => (
      <div className='flex w-2/4 justify-center'>{row.original.createdAt}</div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <CategoryCellAction data={row.original} />
      </div>
    )
  }
]
