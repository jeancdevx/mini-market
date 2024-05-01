import { z } from 'zod'

export type CategoryFormValues = z.output<typeof categorySchema>

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name of category must be at least 3 characters')
    .max(255, 'Name of category must be at most 255 characters')
})
