import Calendar from '~/components/shared/Calendar'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const fakeClosedDays: string[] = []
const fakeHandleDate = jest.fn()

describe('Calendar', () => {
  it('should render', async () => {
    await render(<Calendar closedDays={fakeClosedDays} handleDate={fakeHandleDate} />)
    screen.getByText('15')
  })
})
