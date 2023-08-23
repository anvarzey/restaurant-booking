import Order from '~/components/booking/Order'
import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import useOrderStore from '~/lib/zustand/store'
import useCheckout from '~/hooks/useCheckout'
import { initialOrderState, initialUseCheckout, loadingUseCheckout } from '../../testsUtils/mocks'
import { fakeProductName } from '../../testsUtils/fakeData'

const mockUseCheckout = useCheckout as jest.MockedFunction<typeof useCheckout>
const mockUseOrderStore = useOrderStore as jest.MockedFunction<typeof useOrderStore>

jest.mock('../../../src/lib/zustand/store')
jest.mock('next/navigation')
jest.mock('../../../src/hooks/useCheckout')

describe('Order', () => {
  it('should render correctly', async () => {
    mockUseCheckout.mockImplementation(initialUseCheckout)

    mockUseOrderStore.mockImplementation((fn) => fn(initialOrderState))

    await render(<Order />)
  })

  describe('isLoading', () => {
    it('show spinner', async () => {
      mockUseCheckout.mockImplementation(loadingUseCheckout)

      mockUseOrderStore.mockImplementation((fn) => fn(initialOrderState))

      await render(<Order />)

      screen.getByText('Loading...')
    })
  })

  describe('no products in order', () => {
    it('should be disabled "go to checkout" button', async () => {
      mockUseCheckout.mockImplementation(initialUseCheckout)

      mockUseOrderStore.mockImplementation((fn) => fn(initialOrderState))

      await render(<Order />)

      const btn = screen.getByRole('button', { name: /Go to Checkout/i })

      expect(btn).toBeDisabled()
    })
  })

  describe('products in order', () => {
    it('should show proper products and "go to checkout" should be enabled', async () => {
      mockUseCheckout.mockImplementation(initialUseCheckout)

      mockUseOrderStore.mockImplementation((fn) => {
        const mockState = {
          items: [
            {
              id: 'fakeId',
              name: fakeProductName,
              image: '',
              quantity: 2,
              price: 10,
              priceWithDiscount: 8
            }
          ],
          totalQuantity: 2,
          subtotal: 20,
          total: 16,
          add: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
          reset: jest.fn()
        }

        return fn(mockState)
      })

      await render(<Order />)

      const btn = screen.getByRole('button', { name: /Go to Checkout/i })

      expect(btn).toBeEnabled()

      screen.getByText(fakeProductName)
    })

    it('should call handleCheckout function when clicking on "go to checkout"', async () => {
      const mockHandleCheckout = jest.fn()

      mockUseCheckout.mockImplementation(() => ({
        error: null,
        handleCheckout: mockHandleCheckout,
        isLoading: false,
        resetError: jest.fn()
      }))

      const mockItems = [
        {
          id: 'fakeId',
          name: fakeProductName,
          image: '',
          quantity: 2,
          price: 10,
          priceWithDiscount: 8
        }
      ]

      mockUseOrderStore.mockImplementation((fn) => {
        const mockState = {
          items: mockItems,
          totalQuantity: 2,
          subtotal: 20,
          total: 16,
          add: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
          reset: jest.fn()
        }

        return fn(mockState)
      })

      await render(<Order />)

      const btn = screen.getByRole('button', { name: /Go to Checkout/i })

      expect(btn).toBeEnabled()

      await act(async () => {
        await fireEvent.click(btn)
      })

      expect(mockHandleCheckout).toBeCalledTimes(1)

      expect(mockHandleCheckout).toBeCalledWith(mockItems)
    })
  })
})
