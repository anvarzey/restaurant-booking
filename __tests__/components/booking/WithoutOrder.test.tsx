import WithoutOrder from '~/components/booking/WithoutOrder'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import useBooking from '~/hooks/useBooking'
import { useSession } from 'next-auth/react'

const mockUseBooking = useBooking as jest.MockedFunction<typeof useBooking>
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

jest.mock('../../../src/hooks/useBooking')
jest.mock('next-auth/react')

describe('Without order', () => {
  it('should render', async () => {
    mockUseBooking.mockImplementation(() => {
      return {
        isLoading: false,
        error: null,
        handleBooking: jest.fn()
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

    screen.getByText(/Confirm Date & Time/i)
    screen.getByRole('button', { name: /Change Date\/Time/i })
  })

  describe('Loading', () => {
    it('should show Spinner component when isLoading is set to true', async () => {
      mockUseBooking.mockImplementation(() => {
        return {
          isLoading: true,
          error: null,
          handleBooking: jest.fn()
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

      screen.getByText('Loading...')
    })
  })

  describe('Unauthenticated user', () => {
    it('should call handleReset function when clicking on Change Date/Time button', async () => {
      mockUseBooking.mockImplementation(() => {
        return {
          isLoading: false,
          error: null,
          handleBooking: jest.fn()
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
})
