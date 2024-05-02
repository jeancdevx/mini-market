'use client'

import { useState } from 'react'

import { useParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Category } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Trash } from 'lucide-react'

import {
  createCategory,
  deleteCategory,
  updateCategory
} from '@/actions/category.action'

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
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()

  const action = initialData ? 'Update' : 'Create'
  const title = initialData ? 'Edit Category' : 'Create Category'
  const description = `${action.toLowerCase()} a category for your products`
  const toastMessages = {
    loading: initialData ? 'Updating category...' : 'Creating category...',
    success: initialData ? 'Category updated' : 'Category created',
    error: 'An error occurred while processing your request'
  }

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: ''
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true)

      toast.loading(toastMessages.loading)

      const formData = new FormData()
      formData.append('name', data.name)

      if (initialData) {
        await updateCategory(`${params.categoryId}`, formData)
      } else {
        await createCategory(formData)
      }

      toast.success(toastMessages.success)
    } catch (error) {
      toast.error(toastMessages.error)
    } finally {
      toast.dismiss()
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      toast.loading('Deleting category...')

      await deleteCategory(`${params.categoryId}`)

      toast.success('Category deleted')
    } catch (error) {
      toast.error('An error occurred while processing your request')
    } finally {
      toast.dismiss()
      setOpen(false)
      setIsLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={async () => await onDelete()}
        loading={isSubmitting || isLoading}
      />

      <div className='flex items-center justify-between'>
        <Heading
          title={title}
          description={description}
        />

        {initialData && (
          <Button
            variant='destructive'
            size='sm'
            onClick={() => setOpen(true)}
            disabled={isSubmitting || isLoading}
          >
            <Trash className='h-4 w-4 sm:mr-2' />
            <span className='hidden sm:inline'>Delete</span>
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          action={createCategory}
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
                      disabled={isSubmitting || isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type='submit'
            disabled={isSubmitting || isLoading}
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default FormCategory
