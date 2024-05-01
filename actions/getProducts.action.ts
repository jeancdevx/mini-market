import type { Category, Product } from '@prisma/client'

import { db } from '@/lib/db'

type ProductWithCategory = Product & { category: Category }

interface GetProductsProps {
  productName?: string
  categoryId?: string
}

const getProducts = async ({
  productName,
  categoryId
}: GetProductsProps): Promise<ProductWithCategory[]> => {
  const products = await db.product.findMany({
    where: {
      name: {
        contains: productName,
        mode: 'insensitive'
      },
      categoryId
    },
    include: {
      category: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return products
}

export default getProducts
