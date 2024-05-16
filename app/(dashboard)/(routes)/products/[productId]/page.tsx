import { db } from '@/lib/db'

import FormProduct from '@/components/Forms/FormProduct'

interface ProductIdPageProps {
  params: {
    productId: string
  }
}

const ProductIdPage = async ({ params: { productId } }: ProductIdPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id: productId
    }
  })

  const categories = await db.category.findMany()

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <FormProduct initialData={product} categories={categories} />
      </div>
    </div>
  )
}

export default ProductIdPage
