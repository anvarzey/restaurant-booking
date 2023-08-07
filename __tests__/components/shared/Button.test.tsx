import Button from '~/components/shared/Button'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button variant='outline'>Button</Button>)
    const btn = screen.getByRole('button', { name: 'Button' })
    expect(btn).toBeInTheDocument()
  })
  it('should render the filled version when passing through "filled" to variant prop', () => {
    render(<Button variant='filled'>Button</Button>)
    const btn = screen.getByRole('button', { name: 'Button' })
    expect(btn).toHaveClass('bg-primary')
  })
  it('should render the outline version when passing through "outline" to variant prop', () => {
    render(<Button variant='outline'>Button</Button>)
    const btn = screen.getByRole('button', { name: 'Button' })
    expect(btn).toHaveClass('border-neutral-700')
  })
})

describe('Button as Link', () => {
  it('should render a link when passing "link" prop', () => {
    render(<Button link variant='outline'>Link</Button>)
    const link = screen.getByRole('link', { name: 'Link' })
    expect(link).toBeInTheDocument()
  })
  it('should have href set to "#" when it does not receive an href', () => {
    render(<Button link variant='outline'>Link</Button>)
    const link: HTMLLinkElement = screen.getByRole('link', { name: 'Link' })
    expect(link.href.at(-1)).toBe('#')
  })
  it('should have href set to the same as received', () => {
    const fakeHref = '/fake-page'
    const fakeRegex = /\/fake-page$/
    render(<Button link variant='outline' href={fakeHref}>Link</Button>)
    const link: HTMLLinkElement = screen.getByRole('link', { name: 'Link' })
    expect(link.href.match(fakeRegex)).toBeTruthy()
  })
})
