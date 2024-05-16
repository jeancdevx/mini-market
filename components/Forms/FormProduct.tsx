'use client'

import { useState } from 'react'

import { useParams } from 'next/navigation'

import {
  createProduct,
  deleteProduct,
  updateProduct
} from '@/server/products/product.action'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Category, Product } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  productSchema,
  type ProductFormValues
} from '@/schemas/formProductSchema'

import Heading from '@/components/Heading'
import ImageUpload from '@/components/ImageUpload'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { Separator } from '@/components/ui/Separator'
import { Textarea } from '@/components/ui/Textarea'

interface FormProductProps {
  initialData?: Product | null
  categories: Category[]
}

const FormProduct = ({ initialData, categories }: FormProductProps) => {
  const [open, setOpen] = useState(false)

  const params = useParams()

  const action = initialData ? 'Update' : 'Create'
  const title = initialData ? 'Edit Product' : 'Create Product'
  const description = `${action.toLowerCase()} a product for your store.`

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          price: parseFloat(String(initialData?.price)),
          description: initialData.description,
          image: initialData.image,
          stock: parseInt(String(initialData.stock)),
          categoryId: initialData.categoryId
        }
      : {
          name: '',
          price: 0,
          description: '',
          image: '',
          stock: 0,
          categoryId: ''
        }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: ProductFormValues) => {
    try {
      toast.loading(initialData ? 'Updating product...' : 'Creating product...')

      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('price', data.price.toString())
      formData.append('description', data.description)
      formData.append('image', data.image)
      formData.append('stock', data.stock.toString())
      formData.append('categoryId', data.categoryId)

      if (initialData) {
        await updateProduct(`${params.productId}`, formData)
      } else {
        await createProduct(formData)
      }

      toast.success(
        initialData
          ? 'Product updated successfully'
          : 'Product created successfully'
      )
    } catch (error) {
      toast.error('An error occurred while processing your request')
    } finally {
      toast.dismiss()
    }
  }

  const onDelete = async () => {
    try {
      toast.loading('Deleting product...')

      await deleteProduct(`${params.productId}`)

      toast.success('Product deleted')
    } catch (error) {
      toast.error('An error occurred while processing your request')
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
          action={initialData ? createProduct : createProduct}
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
        >
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-center text-lg font-bold'>
                  Image
                </FormLabel>

                <FormControl>
                  <ImageUpload
                    disabled={isSubmitting}
                    onChange={field.onChange}
                    onRemove={field.onChange}
                    value={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 gap-x-4 md:grid-cols-2 lg:grid-cols-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder='e.g. iPhone 13'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>

                  <FormControl>
                    <Input
                      type='number'
                      placeholder='e.g. 999.99'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>

                  <FormControl>
                    <Input
                      type='number'
                      placeholder='e.g. 100'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 gap-x-8 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder='e.g. The latest iPhone from Apple.'
                      disabled={isSubmitting}
                      className='h-32 resize-none'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>

                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a category'
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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

export default FormProduct
