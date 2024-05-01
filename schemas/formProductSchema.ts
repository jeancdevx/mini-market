import { z } from 'zod'

export type ProductFormValues = z.output<typeof productSchema>

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name of product must be at least 3 characters')
    .max(255, 'Name of product must be at most 255 characters'),
  price: z.coerce
    .number()
    .min(0.99, 'Price of product must be at least 0.99')
    .max(999999, 'Price of product must be at most 999999'),
  description: z
    .string()
    .trim()
    .min(3, 'Description of product must be at least 3 characters'),
  image: z.string().url('Image of product must be a valid URL'),
  categoryId: z.string().uuid('You must select a category'),
  stock: z.coerce
    .number()
    .min(1, 'Stock of product must be at least 1')
    .max(999999, 'Stock of product must be at most 999999')
})
