import { format } from 'date-fns'

import { db } from '@/lib/db'

import CategoryClient from '@/components/Categories/CategoryClient'

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedCategories = categories.map(({ id, name, createdAt }) => ({
    id,
    name,
    createdAt: format(createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex flex-col'>
      <div className='flex-1 p-8 pt-6'>
        <CategoryClient categories={formattedCategories} />
      </div>
    </div>
  )
}
