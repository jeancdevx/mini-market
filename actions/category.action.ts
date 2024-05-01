'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'

import { categorySchema } from '@/schemas/formCategorySchema'

import { db } from '@/lib/db'

export const createCategory = async (data: FormData) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return { message: 'Unauthorized' }
    }

    const validatedData = categorySchema.safeParse({
      name: data.get('name')
    })

    if (!validatedData.success) {
      return { message: 'Validation error' }
    }

    const category = await db.category.create({
      data: {
        name: validatedData.data.name
      }
    })

    return category
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

    const validatedData = categorySchema.safeParse({
      name: data.get('name')
    })

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

    if (category.name === validatedData.data.name) {
      return category
    }

    await db.category.update({
      where: {
        id
      },
      data: {
        name: validatedData.data.name
      }
    })

    return category
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

    await db.category.delete({
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
