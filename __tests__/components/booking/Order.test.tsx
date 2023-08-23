import Order from '~/components/booking/Order'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import useOrderStore from '~/lib/zustand/store'
import useCheckout from '~/hooks/useCheckout'
import { initialUseCheckout, loadingUseCheckout } from '../../testsUtils/fakeData'

const mockUseCheckout = useCheckout as jest.MockedFunction<typeof useCheckout>
const mockUseOrderStore = useOrderStore as jest.MockedFunction<typeof useOrderStore>

jest.mock('../../../src/lib/zustand/store')
jest.mock('next/navigation')
jest.mock('../../../src/hooks/useCheckout')

describe('Order', () => {
  it('should render correctly', async () => {
    mockUseCheckout.mockImplementation(initialUseCheckout)

    mockUseOrderStore.mockImplementation((fn) => {
      const mockState = {
        items: [],
        totalQuantity: 0,
        subtotal: 0,
        total: 0,
        add: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        reset: jest.fn()
      }

      return fn(mockState)
    })

    await render(<Order />)
  })

  describe('isLoading', () => {
    it('show spinner', async () => {
      mockUseCheckout.mockImplementation(loadingUseCheckout)

      mockUseOrderStore.mockImplementation((fn) => {
        const mockState = {
          items: [],
          totalQuantity: 0,
          subtotal: 0,
          total: 0,
          add: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
          reset: jest.fn()
        }

        return fn(mockState)
      })

      await render(<Order />)

      screen.getByText('Loading...')
    })
  })

  describe('no products in order', () => {
    it('should be disabled "go to checkout" button', async () => {
      mockUseCheckout.mockImplementation(initialUseCheckout)

      mockUseOrderStore.mockImplementation((fn) => {
        const mockState = {
          items: [],
          totalQuantity: 0,
          subtotal: 0,
          total: 0,
          add: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
          reset: jest.fn()
        }

        return fn(mockState)
      })

      await render(<Order />)

      const btn = screen.getByRole('button', { name: /Go to Checkout/i })

      expect(btn).toBeDisabled()
    })
  })
})
