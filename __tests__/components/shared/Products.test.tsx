import Products from '~/components/shared/Products'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

let error: Error | undefined
let isLoading = false

jest.mock('swr', () => {
  return jest.fn().mockImplementation(() => ({
    data: [],
    error,
    isLoading
  }))
})

describe('Products', () => {
  const fakeSearchParams = {}
  it('should render Skeleton components when loading', async () => {
    isLoading = true
    await render(<Products searchParams={fakeSearchParams} />)

    screen.getAllByRole('listitem', { name: 'Loading' })
  })

  it('should render custom error message when an error occurres', async () => {
    error = new Error('This is a fake error')
    await render(<Products searchParams={fakeSearchParams} />)

    screen.getByText('An error has been occurred')
  })
})
