import Modal from '~/components/booking/Modal'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BOOKING_STATUS } from '~/components/booking/WithoutOrder'
import { fakeErrorMessage } from '../../testsUtils/fakeData'

describe('Modal with successful message', () => {
  it('should render with successful message', async () => {
    await render(<Modal status={BOOKING_STATUS.SUCCESS} handleReset={jest.fn()} />)

    screen.getByText('Your booking has been successfully made!')
    screen.getByRole('link', { name: /Return to Home/i })
  })
})

describe('Modal with error message', () => {
  it('should render with error message', async () => {
    await render(<Modal status={BOOKING_STATUS.ERROR} message={fakeErrorMessage} handleReset={jest.fn()} />)

    screen.getByText(fakeErrorMessage)
    screen.getByRole('button', { name: /Try Again/i })
  })
  it('should call handleReset when clicking on try again button', async () => {
    const mockHandleReset = jest.fn()
    await render(<Modal status={BOOKING_STATUS.ERROR} message={fakeErrorMessage} handleReset={mockHandleReset} />)

    screen.getByText(fakeErrorMessage)
    const tryAgainBtn = screen.getByRole('button', { name: /Try Again/i })

    fireEvent.click(tryAgainBtn)

    expect(mockHandleReset).toBeCalledTimes(1)
  })
})
