import FormCategory from '@/components/Forms/FormCategory'

import { db } from '@/lib/db'

interface CategoryIdPageProps {
  params: {
    categoryId: string
  }
}

const CategoryIdPage = async ({
  params: { categoryId }
}: CategoryIdPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id: categoryId
    }
  })

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <FormCategory initialData={category} />
      </div>
    </div>
  )
}

export default CategoryIdPage
