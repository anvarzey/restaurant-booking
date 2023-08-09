import Booking from '~/components/booking/Booking'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Booking', () => {
  it('should render', async () => {
    await render(<Booking closedDays={[]} />)

    // NumOfPeople component's title
    screen.getByText('How many people is the booking for?')
  })
})
