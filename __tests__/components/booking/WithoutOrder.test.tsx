import WithoutOrder from '~/components/booking/WithoutOrder'
import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import useBooking from '~/hooks/useBooking'
import { useSession } from 'next-auth/react'
import { fakeName, initialUseBooking, loadingUseBooking } from '../../testsUtils/fakeData'

const mockUseBooking = useBooking as jest.MockedFunction<typeof useBooking>
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

jest.mock('../../../src/hooks/useBooking')
jest.mock('next-auth/react')

describe('Without order', () => {
  it('should render', async () => {
    mockUseBooking.mockImplementation(initialUseBooking)

    mockUseSession.mockImplementation(() => {
      return {
        data: null,
        status: 'unauthenticated',
        update: async () => await Promise.resolve(null)
      }
    })
    const mockHandleReset = jest.fn()
    await render(<WithoutOrder date='' numberOfPeople={2} time='' handleReset={mockHandleReset} />)

    screen.getByText(/Confirm Date & Time/i)
    screen.getByRole('button', { name: /Change Date\/Time/i })
  })

  describe('Loading', () => {
    it('should show Spinner component when isLoading is set to true', async () => {
      mockUseBooking.mockImplementation(loadingUseBooking)

      mockUseSession.mockImplementation(() => {
        return {
          data: null,
          status: 'unauthenticated',
          update: async () => await Promise.resolve(null)
        }
      })
      const mockHandleReset = jest.fn()
      await render(<WithoutOrder date='' numberOfPeople={2} time='' handleReset={mockHandleReset} />)

      screen.getByText('Loading...')
    })
  })

  describe('Unauthenticated user', () => {
    it('should call handleReset function when clicking on Change Date/Time button', async () => {
      mockUseBooking.mockImplementation(initialUseBooking)

      mockUseSession.mockImplementation(() => {
        return {
          data: null,
          status: 'unauthenticated',
          update: async () => await Promise.resolve(null)
        }
      })
      const mockHandleReset = jest.fn()
      await render(<WithoutOrder date='' numberOfPeople={2} time='' handleReset={mockHandleReset} />)

      const changeBtn = screen.getByRole('button', { name: /Change Date\/Time/i })

      fireEvent.click(changeBtn)
      expect(mockHandleReset).toHaveBeenCalledTimes(1)
    })

    it('should not call handleBooking function when clicking on Confirm Booking button', async () => {
      const mockHandleBooking = jest.fn()
      mockUseBooking.mockImplementation(() => {
        return {
          isLoading: false,
          error: null,
          handleBooking: mockHandleBooking
        }
      })
      mockUseSession.mockImplementation(() => {
        return {
          data: null,
          status: 'unauthenticated',
          update: async () => await Promise.resolve(null)
        }
      })
      const mockHandleReset = jest.fn()
      await render(<WithoutOrder date='' numberOfPeople={2} time='' handleReset={mockHandleReset} />)

      const confirmBtn = screen.getByRole('button', { name: /Confirm Booking/i })

      fireEvent.click(confirmBtn)
      expect(mockHandleBooking).not.toHaveBeenCalled()
    })
  })

  describe('Authenticated user', () => {
    it('should open status modal after clicking on Confirm Booking button', async () => {
      const mockHandleBooking = jest.fn().mockImplementationOnce(() => 'Fake Success')

      mockUseBooking.mockImplementation(() => {
        return {
          isLoading: false,
          error: null,
          handleBooking: mockHandleBooking
        }
      })

      mockUseSession.mockImplementation(() => {
        return {
          data: {
            user: {
              id: 'fakeid',
              name: fakeName,
              role: 'USER'
            },
            expires: ''
          },
          status: 'authenticated',
          update: async () => await Promise.resolve(null)
        }
      })

      const mockHandleReset = jest.fn()

      await render(<WithoutOrder date='' numberOfPeople={2} time='' handleReset={mockHandleReset} />)

      const confirmBtn = screen.getByRole('button', { name: /Confirm Booking/i })
      await act(async () => {
        await fireEvent.click(confirmBtn)
      })
      expect(mockHandleBooking).toHaveBeenCalledTimes(1)
      screen.getByText(/Your booking has been successfully made!/i)
    })

    it('should open status modal when an error on booking occurres', async () => {
      const mockHandleBooking = jest.fn().mockResolvedValue(null)

      mockUseBooking.mockImplementation(() => {
        return {
          isLoading: false,
          error: null,
          handleBooking: mockHandleBooking
        }
      })

      mockUseSession.mockImplementation(() => {
        return {
          data: {
            user: {
              id: 'fakeid',
              name: fakeName,
              role: 'USER'
            },
            expires: ''
          },
          status: 'authenticated',
          update: async () => await Promise.resolve(null)
        }
      })

      const mockHandleReset = jest.fn()
      const { rerender } = await render(<WithoutOrder date='' numberOfPeople={2} time='' handleReset={mockHandleReset} />)

      const confirmBtn = screen.getByRole('button', { name: /Confirm Booking/i })

      await act(async () => {
        await fireEvent.click(confirmBtn)
      })

      expect(mockHandleBooking).toHaveBeenCalledTimes(1)

      mockUseBooking.mockImplementation(() => {
        return {
          isLoading: false,
          error: 'Fake Error',
          handleBooking: mockHandleBooking
        }
      })

      await act(async () => {
        await rerender(<WithoutOrder date='' numberOfPeople={2} time='' handleReset={mockHandleReset} />)
      })

      await screen.findByText(/An error has been occurred:/i)
    })
  })
})
