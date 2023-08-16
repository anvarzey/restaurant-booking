import NumOfPeople from '~/components/booking/NumOfPeople'
import {
  act,
  fireEvent,
  render,
  screen
} from '@testing-library/react'
import '@testing-library/jest-dom'

const mockHandler = jest.fn()
describe('Booking', () => {
  it('should render correctly', async () => {
    await render(<NumOfPeople handleNumOfPeople={mockHandler} />)

    screen.getByText('How many people is the booking for?')
  })
  it('should enable confirm button when selecting a proper value', async () => {
    await render(<NumOfPeople handleNumOfPeople={mockHandler} />)

    const select = screen.getByRole('combobox')

    await act(() => {
      fireEvent.change(select, { target: { value: '2' } })
    })
    const btn = screen.getByRole('button', { name: /Confirm/i })
    expect(btn).toBeEnabled()
  })
})
