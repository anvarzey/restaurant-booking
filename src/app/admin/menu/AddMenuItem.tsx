'use client'

import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'

interface IValues {
  name: string
  category: string
  image: string
  price: number
  priceWithDiscount: number
}

export default function AddMenuItem (): ReactElement {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      category: '',
      image: '',
      price: 0,
      priceWithDiscount: 0
    }
  })

  const onSubmit = (value: IValues): void => {
    console.log(value)
  }

  return (
    <form className='flex flex-col border p-4 w-1/2' onSubmit={() => handleSubmit(onSubmit)}>
      <div className='flex flex-col'>
        <label htmlFor=''>Name</label>
        <input {...register('name')} type='text' />
      </div>
      <div className='flex flex-col'>
        <label htmlFor=''>Category</label>
        <input {...register('category')} type='text' />
      </div>
      <div className='flex flex-col'>
        <label htmlFor=''>Image URL</label>
        <input {...register('image')} type='text' />
      </div>
      <div className='flex flex-col'>
        <label htmlFor=''>Price</label>
        <input {...register('price')} type='text' />
      </div>
      <div className='flex flex-col'>
        <label htmlFor=''>Price With Discount</label>
        <input {...register('priceWithDiscount')} type='text' />
      </div>
      <button>Add Item</button>
    </form>
  )
}
