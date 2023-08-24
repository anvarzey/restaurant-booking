import OrderItem from '~/components/booking/OrderItem'
import {
  act,
  fireEvent,
  render,
  screen
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { fakeItem } from '../../testsUtils/fakeData'
import useOrderStore from '~/lib/zustand/store'

const mockUseOrderStore = useOrderStore as jest.MockedFunction<typeof useOrderStore>

jest.mock('../../../src/lib/zustand/store')

describe('Order Item', () => {
  const mockRemove = jest.fn()
  const mockUpdate = jest.fn()

  beforeEach(() => {
    mockUseOrderStore.mockImplementation((fn) => {
      const order = {
        items: [fakeItem],
        totalQuantity: 2,
        subtotal: 20.40,
        total: 19.70,
        add: jest.fn(),
        update: mockUpdate,
        remove: mockRemove,
        reset: jest.fn()
      }
      return fn(order)
    })
  })

  it('should render correctly', async () => {
    await render(<OrderItem item={fakeItem} />)

    screen.getByText(fakeItem.name)
  })

  it('should call remove function clicking on the remove button', async () => {
    await render(<OrderItem item={fakeItem} />)

    const btn = screen.getByRole('button', { name: 'Remove item' })

    await act(async () => {
      await fireEvent.click(btn)
    })

    expect(mockRemove).toBeCalledTimes(1)
    expect(mockRemove).toBeCalledWith(fakeItem.id)
  })

  it('should update the quantity in store when changing select', async () => {
    await render(<OrderItem item={fakeItem} />)

    const select = screen.getByRole('combobox')

    await act(async () => {
      await fireEvent.change(select, { target: { value: '4' } })
    })

    expect(mockUpdate).toBeCalledWith(fakeItem.id, 4)
  })
})
