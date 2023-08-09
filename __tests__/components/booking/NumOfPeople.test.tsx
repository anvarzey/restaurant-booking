import NumOfPeople from '~/components/booking/NumOfPeople'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const mockHandler = jest.fn()
describe('Booking', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render correctly', async () => {
    await render(<NumOfPeople handleNumOfPeople={mockHandler} />)

    screen.getByText('How many people is the booking for?')
  })
  it('should render correctly', async () => {
    await render(<NumOfPeople handleNumOfPeople={mockHandler} />)

    const select = screen.getByRole('combobox', { name: 'people-selector' })
    fireEvent.select(select, { name: '2' })
    const btn = screen.getByRole('button', { name: 'Confirm' })
    expect(btn).toBeEnabled()
  })
})
