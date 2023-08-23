import useBooking from '~/hooks/useBooking'
import useCheckout from '~/hooks/useCheckout'

export const fakeURL = 'http://www.fakeurl.com/'

export const fakeOrderItems = [
  {
    id: 'fakeId',
    name: 'Faker',
    image: 'image-url',
    quantity: 2,
    price: 10.20,
    priceWithDiscount: 9.85
  }
]

export const fakeName = 'Fake Name'

export const fakeEmail = 'fake@email.com'

export const fakeErrorMessage = 'Error Message'

export const fakePassword = 'thefakepassword'

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
