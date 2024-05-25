'use client'

import { useState } from 'react'

import { useParams } from 'next/navigation'

import {
  createCategory,
  deleteCategory,
  updateCategory
} from '@/server/categories/category.action'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Category } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  categorySchema,
  type CategoryFormValues
} from '@/schemas/formCategorySchema'

import Heading from '@/components/Heading'
import AlertModal from '@/components/Modals/AlertModal'
import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Separator } from '@/components/ui/Separator'

interface FormCategoryProps {
  initialData?: Category | null
}

const FormCategory = ({ initialData }: FormCategoryProps) => {
  const [open, setOpen] = useState(false)

  const params = useParams()

  const action = initialData ? 'Update' : 'Create'
  const title = initialData ? 'Edit Category' : 'Create Category'
  const description = initialData
    ? 'Update the category details'
    : 'Add a new category'

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: ''
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      toast.loading(`${action} category...`)

      const formData = new FormData()
      formData.append('name', data.name)

      if (initialData) {
        await updateCategory(`${params.categoryId}`, formData)
      } else {
        await createCategory(formData)
      }

      toast.success(`Category ${action.toLowerCase()}ed`)
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      toast.dismiss()
    }
  }

  const onDelete = async () => {
    try {
      toast.loading('Deleting category...')

      await deleteCategory(`${params.categoryId}`)

      toast.success('Category deleted')
    } catch (error) {
      toast.error('Make sure you remove all products in this category first.')
    } finally {
      toast.dismiss()
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={async () => await onDelete()}
        loading={isSubmitting}
      />

      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant='destructive'
            size='sm'
            onClick={() => setOpen(true)}
            disabled={isSubmitting}
          >
            <Trash className='h-4 w-4 sm:mr-2' />
            <span className='hidden sm:inline'>Delete</span>
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder='e.g. Clothing, Electronics, etc.'
                      disabled={isSubmitting}
                      autoFocus
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' disabled={isSubmitting}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default FormCategory
