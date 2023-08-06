import Button from '~/components/shared/Button'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button variant='outline'>Button</Button>)
    const btn = screen.getByRole('button', { name: 'Button' })
    expect(btn).toBeInTheDocument()
  })
  it('should render a link when passing "link" prop', () => {
    render(<Button link variant='outline'>Link</Button>)
    const link = screen.getByRole('link', { name: 'Link' })
    expect(link).toBeInTheDocument()
  })
})
