import OrderModal from '~/components/booking/OrderModal'
import { ORDER } from '~/components/booking/Booking'
import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import useCheckout from '~/hooks/useCheckout'
import useOrderStore from '~/lib/zustand/store'
import { fakeErrorMessage } from '../../testsUtils/fakeData'

const mockUseCheckout = useCheckout as jest.MockedFunction<typeof useCheckout>
const mockUseOrderStore = useOrderStore as jest.MockedFunction<typeof useOrderStore>

/*
import { useRouter } from 'next/navigation'
*/

jest.mock('../../../src/hooks/useCheckout')
jest.mock('../../../src/lib/zustand/store')
jest.mock('next/navigation')

describe('Order Modal', () => {
  it('should render correctly', async () => {
    mockUseCheckout.mockImplementation(() => ({
      error: null,
      handleCheckout: jest.fn(),
      isLoading: false,
      resetError: jest.fn()
    }))
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
    const mockHandleOrder = jest.fn()
    await render(<OrderModal handleOrder={mockHandleOrder} />)

    screen.getByText(/Do you want to order ?/i)
  })

  describe('isLoading', () => {
    it('should show spinner', async () => {
      mockUseCheckout.mockImplementation(() => ({
        error: null,
        handleCheckout: jest.fn(),
        isLoading: true,
        resetError: jest.fn()
      }))
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
      const mockHandleOrder = jest.fn()
      await render(<OrderModal handleOrder={mockHandleOrder} />)

      screen.getByText(/Loading\.\.\./i)
    })
  })

  describe('no products in order', () => {
    it('should show the options of order and continue without ordering', async () => {
      mockUseCheckout.mockImplementation(() => ({
        error: null,
        handleCheckout: jest.fn(),
        isLoading: false,
        resetError: jest.fn()
      }))
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
      const mockHandleOrder = jest.fn()
      await render(<OrderModal handleOrder={mockHandleOrder} />)

      screen.getByRole('button', { name: 'No, continue with reservation' })
      screen.getByRole('button', { name: 'Order Now' })
    })

    it('should call handleOrder function with NOT_ORDER when clicking on continue with reservation', async () => {
      mockUseCheckout.mockImplementation(() => ({
        error: null,
        handleCheckout: jest.fn(),
        isLoading: false,
        resetError: jest.fn()
      }))
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
      const mockHandleOrder = jest.fn()
      await render(<OrderModal handleOrder={mockHandleOrder} />)

      const btn = screen.getByRole('button', { name: 'No, continue with reservation' })

      await act(async () => {
        await fireEvent.click(btn)
      })

      expect(mockHandleOrder).toBeCalledWith(ORDER.NOT_ORDER)
    })

    it('should call handleOrder function with ORDER when clicking on order now', async () => {
      mockUseCheckout.mockImplementation(() => ({
        error: null,
        handleCheckout: jest.fn(),
        isLoading: false,
        resetError: jest.fn()
      }))
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
      const mockHandleOrder = jest.fn()
      await render(<OrderModal handleOrder={mockHandleOrder} />)

      const btn = screen.getByRole('button', { name: 'Order Now' })

      await act(async () => {
        await fireEvent.click(btn)
      })

      expect(mockHandleOrder).toBeCalledWith(ORDER.ORDER)
    })
  })

  describe('products in order', () => {
    it('should show the options of add more products and go to checkout', async () => {
      mockUseCheckout.mockImplementation(() => ({
        error: null,
        handleCheckout: jest.fn(),
        isLoading: false,
        resetError: jest.fn()
      }))
      mockUseOrderStore.mockImplementation((fn) => {
        const mockState = {
          items: [
            {
              id: 'fakeId',
              name: 'FakeProduct',
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
      const mockHandleOrder = jest.fn()
      await render(<OrderModal handleOrder={mockHandleOrder} />)

      screen.getByRole('button', { name: 'Add more products' })
      screen.getByRole('button', { name: 'Go to Checkout' })
    })

    it('should call handleOrder function with ORDER when clicking on add more products', async () => {
      mockUseCheckout.mockImplementation(() => ({
        error: null,
        handleCheckout: jest.fn(),
        isLoading: false,
        resetError: jest.fn()
      }))
      mockUseOrderStore.mockImplementation((fn) => {
        const mockState = {
          items: [
            {
              id: 'fakeId',
              name: 'FakeProduct',
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
      const mockHandleOrder = jest.fn()
      await render(<OrderModal handleOrder={mockHandleOrder} />)

      const btn = screen.getByRole('button', { name: 'Add more products' })

      await act(async () => {
        await fireEvent.click(btn)
      })

      expect(mockHandleOrder).toBeCalledWith(ORDER.ORDER)
    })

    it('should call handleCheckout function when clicking on go to checkout', async () => {
      const mockHandleCheckout = jest.fn()
      const fakeItems = [
        {
          id: 'fakeId',
          name: 'FakeProduct',
          image: '',
          quantity: 2,
          price: 10,
          priceWithDiscount: 8
        }
      ]
      mockUseCheckout.mockImplementation(() => ({
        error: null,
        handleCheckout: mockHandleCheckout,
        isLoading: false,
        resetError: jest.fn()
      }))
      mockUseOrderStore.mockImplementation((fn) => {
        const mockState = {
          items: fakeItems,
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
      const mockHandleOrder = jest.fn()
      await render(<OrderModal handleOrder={mockHandleOrder} />)

      const btn = screen.getByRole('button', { name: 'Go to Checkout' })

      await act(async () => {
        await fireEvent.click(btn)
      })

      expect(mockHandleCheckout).toBeCalledWith(fakeItems)
    })
  })

  describe('error', () => {
    it('should show error message', async () => {
      mockUseCheckout.mockImplementation(() => ({
        error: fakeErrorMessage,
        handleCheckout: jest.fn(),
        isLoading: false,
        resetError: jest.fn()
      }))
      mockUseOrderStore.mockImplementation((fn) => {
        const mockState = {
          items: [
            {
              id: 'fakeId',
              name: 'FakeProduct',
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
      const mockHandleOrder = jest.fn()
      await render(<OrderModal handleOrder={mockHandleOrder} />)

      screen.getByText('An error has been occurred:')
      screen.getByText(fakeErrorMessage)
    })

    it('should call resetError function when clicking on try again', async () => {
      const mockResetError = jest.fn()
      mockUseCheckout.mockImplementation(() => ({
        error: fakeErrorMessage,
        handleCheckout: jest.fn(),
        isLoading: false,
        resetError: mockResetError
      }))
      mockUseOrderStore.mockImplementation((fn) => {
        const mockState = {
          items: [
            {
              id: 'fakeId',
              name: 'FakeProduct',
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
      const mockHandleOrder = jest.fn()
      await render(<OrderModal handleOrder={mockHandleOrder} />)

      const btn = screen.getByRole('button', { name: 'Try Again' })

      await act(async () => {
        await fireEvent.click(btn)
      })

      expect(mockResetError).toBeCalledTimes(1)
    })
  })
})
