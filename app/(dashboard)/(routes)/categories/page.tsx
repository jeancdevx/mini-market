import { getCategories } from '@/server/categories'

import CategoryClient from '@/components/Categories/CategoryClient'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className='flex flex-col'>
      <div className='flex-1 p-8 pt-6'>
        <CategoryClient categories={categories} />
      </div>
    </div>
  )
}
