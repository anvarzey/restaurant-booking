'use client'

import { useState } from 'react'
import type { Item } from '~/lib/zustand/store'

interface IReturn {
  error: string | null
  handleCheckout: (args: Item[]) => Promise<string | null>
  isLoading: boolean
  resetError: () => void
}

export default function useCheckout (): IReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async (items: Item[]): Promise<string | null> => {
    setIsLoading(true)
    const productsList = items.map(item => {
      return {
        id: item.id,
        quantity: item.quantity
      }
    })

    const res = await fetch('/api/checkout', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(productsList)
    })
      .then(async (res) => await res.json())
      .catch(e => setError(e.error ?? 'An error has been occurred'))

    setIsLoading(false)

    if (res?.url) {
      return res.url
    }
    return null
  }

  const resetError = (): void => {
    setError(null)
  }

  return {
    error,
    handleCheckout,
    isLoading,
    resetError
  }
}
