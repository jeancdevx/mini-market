'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'

import { productSchema } from '@/schemas/formProductSchema'

import { db } from '@/lib/db'

export const createProduct = async (data: FormData) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return { message: 'Unauthenticated' }
    }

    const validatedData = productSchema.safeParse({
      name: data.get('name'),
      price: data.get('price'),
      description: data.get('description'),
      image: data.get('image'),
      stock: data.get('stock'),
      categoryId: data.get('categoryId')
    })

    if (!validatedData.success) {
      return { message: 'Validation error' }
    }

    const product = await db.product.create({
      data: {
        name: validatedData.data.name,
        price: validatedData.data.price,
        description: validatedData.data.description,
        image: validatedData.data.image,
        stock: validatedData.data.stock,
        categoryId: validatedData.data.categoryId
      }
    })

    return product
  } catch (error) {
    return {
      message: 'An error occurred while creating the product. Please try again.'
    }
  } finally {
    revalidatePath('/products')
    redirect('/products')
  }
}

export const updateProduct = async (id: string, data: FormData) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return { message: 'Unauthenticated' }
    }

    const validatedData = productSchema.safeParse({
      name: data.get('name'),
      price: data.get('price'),
      description: data.get('description'),
      image: data.get('image'),
      stock: data.get('stock'),
      categoryId: data.get('categoryId')
    })

    if (!validatedData.success) {
      return { message: 'Validation error' }
    }

    const product = await db.product.update({
      where: {
        id
      },
      data: {
        name: validatedData.data.name,
        price: validatedData.data.price,
        description: validatedData.data.description,
        image: validatedData.data.image,
        stock: validatedData.data.stock,
        categoryId: validatedData.data.categoryId
      }
    })

    return product
  } catch (error) {
    return {
      message: 'An error occurred while updating the product. Please try again.'
    }
  } finally {
    revalidatePath('/products')
    redirect('/products')
  }
}

export const deleteProduct = async (id: string) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return { message: 'Unauthenticated' }
    }

    const product = await db.product.findUnique({
      where: {
        id
      }
    })

    if (!product) {
      return { message: 'Product not found' }
    }

    await db.product.delete({
      where: {
        id
      }
    })

    return product
  } catch (error) {
    return {
      message: 'An error occurred while deleting the product. Please try again.'
    }
  } finally {
    revalidatePath('/products')
    redirect('/products')
  }
}
