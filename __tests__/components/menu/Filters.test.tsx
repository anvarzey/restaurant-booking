import Filters from '~/components/menu/Filters'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSearchParams } from 'next/navigation'

const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams | (() => ({ get: () => string }))>

jest.mock('next/navigation', () => {
  return {
    useSearchParams: jest.fn()
  }
})

describe('Filters', () => {
  it('should render correctly', async () => {
    mockUseSearchParams.mockImplementation(() => (
      {
        get: () => ''
      }
    ))

    render(<Filters page='menu' />)

    screen.getByText(/Filter by category/i)
    screen.getByRole('link', { name: /Beers/i })
  })

  it('should display the actual filter link with active styles and others not', async () => {
    mockUseSearchParams.mockImplementation(() => (
      {
        get: () => 'beers'
      }
    ))
    render(<Filters page='menu' />)

    const beersLink = screen.getByRole('link', { name: /Beers/i })
    const pizzasLink = screen.getByRole('link', { name: /Pizzas/i })

    expect(beersLink).toHaveClass('text-primary')
    expect(pizzasLink).not.toHaveClass('text-primary')
  })

  it('should have all links the standard styles when not filter is applied', async () => {
    mockUseSearchParams.mockImplementation(() => (
      {
        get: () => ''
      }
    ))
    render(<Filters page='menu' />)

    const beersLink = screen.getByRole('link', { name: /Beers/i })
    const pizzasLink = screen.getByRole('link', { name: /Pizzas/i })

    expect(beersLink).not.toHaveClass('text-primary')
    expect(pizzasLink).not.toHaveClass('text-primary')
  })
})
