import OrderModal from '~/components/menu/OrderModal'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import useOrderStore, { Item } from '~/lib/zustand/store'

const mockUseOrderStore = useOrderStore as jest.MockedFunction<typeof useOrderStore>

jest.mock('../../../src/lib/zustand/store')
jest.mock('zustand/shallow')

describe('Order Modal', () => {
  it('should render correctly', async () => {
    mockUseOrderStore.mockImplementation((fn) => {
      const add = jest.fn()
      const items: Item[] = []
      const remove = jest.fn()
      const reset = jest.fn()
      const subtotal = 0
      const total = 0
      const totalQuantity = 0
      const update = jest.fn()

      const fakeState = {
        add,
        items,
        remove,
        reset,
        subtotal,
        total,
        totalQuantity,
        update
      }
      return fn(fakeState)
    })
    await render(<OrderModal />)

    screen.getByText('Order')
  })

  describe('body', () => {
    it('should be closed when rendering', async () => {
      mockUseOrderStore.mockImplementation((fn) => {
        const add = jest.fn()
        const items: Item[] = []
        const remove = jest.fn()
        const reset = jest.fn()
        const subtotal = 0
        const total = 0
        const totalQuantity = 0
        const update = jest.fn()

        const fakeState = {
          add,
          items,
          remove,
          reset,
          subtotal,
          total,
          totalQuantity,
          update
        }
        return fn(fakeState)
      })
      await render(<OrderModal />)

      const modalBody = screen.getByTestId('modal-body')

      expect(modalBody).toHaveClass('hidden')
    })

    it('should open modal when clicking on open icon', async () => {
      mockUseOrderStore.mockImplementation((fn) => {
        const add = jest.fn()
        const items: Item[] = []
        const remove = jest.fn()
        const reset = jest.fn()
        const subtotal = 0
        const total = 0
        const totalQuantity = 0
        const update = jest.fn()

        const fakeState = {
          add,
          items,
          remove,
          reset,
          subtotal,
          total,
          totalQuantity,
          update
        }
        return fn(fakeState)
      })
      await render(<OrderModal />)

      const openBtn = screen.getByTestId('open-modal')
      fireEvent.click(openBtn)

      const modalBody = screen.getByTestId('modal-body')

      expect(modalBody).not.toHaveClass('hidden')
    })

    it('should close modal when clicking on close icon', async () => {
      mockUseOrderStore.mockImplementation((fn) => {
        const add = jest.fn()
        const items: Item[] = []
        const remove = jest.fn()
        const reset = jest.fn()
        const subtotal = 0
        const total = 0
        const totalQuantity = 0
        const update = jest.fn()

        const fakeState = {
          add,
          items,
          remove,
          reset,
          subtotal,
          total,
          totalQuantity,
          update
        }
        return fn(fakeState)
      })
      await render(<OrderModal />)

      const openBtn = screen.getByTestId('open-modal')
      fireEvent.click(openBtn)

      const closeBtn = screen.getByTestId('close-modal')
      fireEvent.click(closeBtn)

      const modalBody = screen.getByTestId('modal-body')

      expect(modalBody).toHaveClass('hidden')
    })
  })
})
