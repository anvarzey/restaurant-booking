import TimePicker from '~/components/booking/TimePicker'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import useSWR from 'swr'
import { fakeErrorMessage } from '../../testsUtils/fakeData'

const mockUseSWR = useSWR as jest.MockedFunction<typeof useSWR>

jest.mock('swr')

describe('Time Picker', () => {
  it('should render correctly', async () => {
    mockUseSWR.mockImplementation(() => {
      const data = {
        openTime: '08:00',
        closeTime: '23:00'
      }
      const error = undefined
      const isLoading = false

      return {
        data,
        error,
        isLoading,
        mutate: async () => await new Promise(() => ''),
        isValidating: false
      }
    })

    const mockHandleReset = jest.fn()
    const mockHandleTime = jest.fn()
    const mockDate = ''

    render(<TimePicker date={mockDate} handleReset={mockHandleReset} handleTime={mockHandleTime} />)

    screen.getByText(/Pick your time/i)
  })

  it('should call handleTime function when clicking on a time', async () => {
    mockUseSWR.mockImplementation(() => {
      const data = {
        openTime: '08:00',
        closeTime: '23:00'
      }
      const error = undefined
      const isLoading = false

      return {
        data,
        error,
        isLoading,
        mutate: async () => await new Promise(() => ''),
        isValidating: false
      }
    })

    const mockHandleReset = jest.fn()
    const mockHandleTime = jest.fn()
    const mockDate = ''

    render(<TimePicker date={mockDate} handleReset={mockHandleReset} handleTime={mockHandleTime} />)

    const timeValue = '18:00'

    const timeLabel = screen.getByText(timeValue)

    await fireEvent.click(timeLabel)

    expect(mockHandleTime).toBeCalledWith(timeValue)
  })

  describe('isLoading', () => {
    it('should show loading spinner', async () => {
      mockUseSWR.mockImplementation(() => {
        const data = null
        const error = undefined
        const isLoading = true

        return {
          data,
          error,
          isLoading,
          mutate: async () => await new Promise(() => ''),
          isValidating: false
        }
      })

      const mockHandleReset = jest.fn()
      const mockHandleTime = jest.fn()
      const mockDate = ''

      render(<TimePicker date={mockDate} handleReset={mockHandleReset} handleTime={mockHandleTime} />)

      screen.getByText(/Loading\.\.\./i)
    })
  })

  describe('error', () => {
    it('should message error', async () => {
      mockUseSWR.mockImplementation(() => {
        const data = null
        const error = fakeErrorMessage
        const isLoading = false

        return {
          data,
          error,
          isLoading,
          mutate: async () => await new Promise(() => ''),
          isValidating: false
        }
      })

      const mockHandleReset = jest.fn()
      const mockHandleTime = jest.fn()
      const mockDate = ''

      render(<TimePicker date={mockDate} handleReset={mockHandleReset} handleTime={mockHandleTime} />)

      screen.getByText(/An error has been occurred/i)
    })
  })
})
