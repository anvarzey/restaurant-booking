import type { Item } from '~/lib/zustand/store'

export const handleCheckout = async (items: Item[]): Promise<string> => {
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
    .catch(e => e)

  return res.url
  // if (res.url !== undefined) {
  //   await router.push(res.url)
  // }
}
