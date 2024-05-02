'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'

import { deleteCategory } from '@/actions/category.action'

import AlertModal from '@/components/Modals/AlertModal'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'

import { type CategoryColumn } from './CategoryColumns'

interface CategoryCellActionProps {
  data: CategoryColumn
}

const CategoryCellAction = ({ data }: CategoryCellActionProps) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.info('Category id copied to clipboard')
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      toast.loading('Deleting category...')

      await deleteCategory(data.id)

      toast.success('Category deleted')
    } catch (error) {
      toast.error(
        'An error occurred while deleting the category. Please try again.'
      )
    } finally {
      setIsLoading(false)
      setOpen(false)
      toast.dismiss()
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={async () => await onDelete()}
        loading={isLoading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
            disabled={isLoading}
          >
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className='mr-2 h-4 w-4' />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/categories/${data.id}`)}
          >
            <Edit className='mr-2 h-4 w-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CategoryCellAction
