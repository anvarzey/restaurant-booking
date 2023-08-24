import Header from '~/components/shared/Header'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as nextAuthReact from 'next-auth/react'
import { fakeName } from '../../testsUtils/fakeData'

const mockNextAuthReact = nextAuthReact as jest.Mocked<typeof nextAuthReact>

jest.mock('next-auth/react')

describe('Header', () => {
  describe('Unauthenticated user', () => {
    beforeEach(() => {
      mockNextAuthReact.useSession.mockImplementation(() => ({
        update: async () => await Promise.resolve(null),
        data: null,
        status: 'unauthenticated'
      }))
    })

    it('should render', async () => {
      await render(<Header />)

      screen.getByRole('link', { name: /Home/i })
      screen.getByRole('button', { name: /Sign In/i })
    })

    it('should call signIn function when clicking on sign in button', async () => {
      await render(<Header />)

      const btn = screen.getByRole('button', { name: /Sign In/i })

      fireEvent.click(btn)

      expect(mockNextAuthReact.signIn).toBeCalledTimes(1)
    })
  })
  describe('Authenticated user', () => {
    beforeEach(() => {
      mockNextAuthReact.useSession.mockImplementation(() => ({
        update: async () => await Promise.resolve(null),
        data: {
          user: {
            id: 'fakeid',
            name: fakeName,
            role: 'USER'
          },
          expires: ''
        },
        status: 'authenticated'
      }))
    })

    it('should render user\'s name instead of sign in button', async () => {
      await render(<Header />)

      screen.getByText(fakeName)

      const signInBtn = screen.queryByRole('button', { name: 'Sign In' })
      expect(signInBtn).toBeNull()
    })

    it('should call signOut function when clicking on sign out button', async () => {
      await render(<Header />)

      const btn = screen.getByRole('button', { name: fakeName })

      fireEvent.click(btn)

      const signOutBtn = screen.getByRole('button', { name: 'Sign Out' })

      await fireEvent.click(signOutBtn)

      expect(mockNextAuthReact.signOut).toBeCalledTimes(1)
    })
  })
})
