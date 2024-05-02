'use client'

import { ArrowDown, ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/Button'

interface AddToCartProps {
  id: string
}

const AddToCart = ({ id }: AddToCartProps) => {
  const [quantity, setQuantity] = useState(0)

  const handleAddToCart = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleRemoveFromCart = () => {
    setQuantity((prev) => prev - 1)
  }

  return (
    <div className='flex items-center justify-between gap-x-2'>
      <Button
        onClick={handleRemoveFromCart}
        disabled={quantity === 0}
      >
        <ArrowDown className='h-4 w-4' />
      </Button>

      <div className='flex-1 text-center font-semibold'>{quantity}</div>

      <Button onClick={handleAddToCart}>
        <ArrowUp className='h-4 w-4' />
      </Button>
    </div>
  )
}

export default AddToCart
