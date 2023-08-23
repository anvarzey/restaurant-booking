import useBooking from '~/hooks/useBooking'
import useCheckout from '~/hooks/useCheckout'

export const initialUseBooking: typeof useBooking = () => {
  return {
    isLoading: false,
    error: null,
    handleBooking: jest.fn()
  }
}

export const loadingUseBooking: typeof useBooking = () => {
  return {
    isLoading: true,
    error: null,
    handleBooking: jest.fn()
  }
}

export const initialUseCheckout: typeof useCheckout = () => ({
  error: null,
  handleCheckout: jest.fn(),
  isLoading: false,
  resetError: jest.fn()
})

export const loadingUseCheckout: typeof useCheckout = () => ({
  error: null,
  handleCheckout: jest.fn(),
  isLoading: true,
  resetError: jest.fn()
})

export const initialOrderState = {
  items: [],
  totalQuantity: 0,
  subtotal: 0,
  total: 0,
  add: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  reset: jest.fn()
}
