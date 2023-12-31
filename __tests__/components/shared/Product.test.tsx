import Product from '~/components/shared/Product'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const fakeProduct = {
  id: '',
  name: 'FakeProduct',
  category: '',
  image: '/next.svg',
  price: 0,
  priceWithDiscount: 0
}

jest.mock('../../../src/lib/zustand/store', () => {
  const fakeAdd = jest.fn()

  const fakeState = {
    add: fakeAdd
  }

  const fakeUseOrderStore = (fn: any): any => {
    return fn(fakeState)
  }

  const useOrderStore = fakeUseOrderStore
  return useOrderStore
})

describe('Product', () => {
  it('should render', async () => {
    await render(<Product product={fakeProduct} />)

    screen.getByText(fakeProduct.name)
  })
})
