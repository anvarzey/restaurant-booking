import Products from '~/components/shared/Products'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import useSWR from 'swr'
import { fakeErrorMessage } from '../../testsUtils/fakeData'

const mockUseSWR = useSWR as jest.MockedFunction<typeof useSWR>

jest.mock('swr', () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
})

describe('Products', () => {
  const fakeSearchParams = {}
  it('should render Skeleton components when loading', async () => {
    mockUseSWR.mockImplementation(() => (
      {
        data: [],
        error: undefined,
        isLoading: true,
        mutate: async () => await Promise.resolve({}),
        isValidating: false
      }
    ))
    await render(<Products searchParams={fakeSearchParams} />)

    screen.getAllByRole('listitem', { name: 'Loading' })
  })

  it('should render custom error message when an error occurres', async () => {
    mockUseSWR.mockImplementation(() => (
      {
        data: [],
        error: fakeErrorMessage,
        isLoading: false,
        mutate: async () => await Promise.resolve({}),
        isValidating: false
      }
    ))
    await render(<Products searchParams={fakeSearchParams} />)

    screen.getByText('An error has been occurred')
  })
})
