'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'
import { format } from 'date-fns'

import { db } from '@/lib/db'
import { categorySchema } from '@/schemas/formCategorySchema'

export const createCategory = async (data: FormData) => {
  try {
    const { userId } = auth()

    if (!userId) return { message: 'Unauthenticated' }

    const formData = Object.fromEntries(data)
    const validatedData = categorySchema.safeParse(formData)

    if (!validatedData.success) {
      return {
        message: 'Validation error'
      }
    }

    const existingCategory = await db.category.findFirst({
      where: {
        name: validatedData.data.name
      }
    })

    if (existingCategory) {
      return { message: 'Category already exists' }
    }

    const category = await db.category.create({
      data: {
        name: validatedData.data.name
      }
    })

    if (!category) {
      return { message: 'An error occurred while creating the category' }
    }

    return { message: 'Category created' }
  } catch (error) {
    return {
      message:
        'An error occurred while creating the category. Please try again.'
    }
  } finally {
    revalidatePath('/categories')
    redirect('/categories')
  }
}

export const updateCategory = async (id: string, data: FormData) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return { message: 'Unauthenticated' }
    }

    const formData = Object.fromEntries(data)
    const validatedData = categorySchema.safeParse(formData)

    if (!validatedData.success) {
      return { message: 'Validation error' }
    }

    const category = await db.category.findUnique({
      where: {
        id
      }
    })

    if (!category) {
      return { message: 'Category not found' }
    }

    const existingCategory = await db.category.findFirst({
      where: {
        name: validatedData.data.name
      }
    })

    if (existingCategory) {
      return { message: 'Category already exists' }
    }

    await db.category.update({
      where: {
        id
      },
      data: {
        name: validatedData.data.name
      }
    })

    return { message: 'Category updated' }
  } catch (error) {
    return {
      message:
        'An error occurred while updating the category. Please try again.'
    }
  } finally {
    revalidatePath('/categories')
    redirect('/categories')
  }
}

export const deleteCategory = async (id: string) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return { message: 'Unauthorized' }
    }

    await db.category.deleteMany({
      where: {
        id
      }
    })

    return { message: 'Category deleted' }
  } catch (error) {
    return {
      message:
        'An error occurred while deleting the category. Please try again.'
    }
  } finally {
    revalidatePath('/categories')
    redirect('/categories')
  }
}

export async function getCategories() {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  const formattedCategories = categories.map(({ id, name, createdAt }) => ({
    id,
    name,
    createdAt: format(createdAt, 'MMMM do, yyyy')
  }))

  return formattedCategories
}

export async function getFilterCategories(
  take: string = '5',
  skip: string = '0'
) {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    },
    take: parseInt(take),
    skip: parseInt(skip)
  })

  const formattedCategories = categories.map(({ id, name, createdAt }) => ({
    id,
    name,
    createdAt: format(createdAt, 'MMMM do, yyyy')
  }))

  return formattedCategories
}
