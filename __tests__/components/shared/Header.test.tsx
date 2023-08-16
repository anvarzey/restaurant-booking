import Header from '~/components/shared/Header'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as nextAuthReact from 'next-auth/react'
import { fakeName } from '../../testsUtils/fakeData'

const mockNextAuthReact = nextAuthReact as jest.Mocked<typeof nextAuthReact>

jest.mock('next-auth/react')

describe('Header', () => {
  describe('Unauthenticated user', () => {
    it('should render', async () => {
      mockNextAuthReact.useSession.mockImplementation(() => ({
        update: async () => await Promise.resolve(null),
        data: null,
        status: 'unauthenticated'
      }))
      await render(<Header />)

      screen.getByRole('link', { name: /Home/i })
      screen.getByRole('button', { name: /Sign In/i })
    })
  })
  describe('Authenticated user', () => {
    it('should render user\'s name instead of sign in button', async () => {
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
      await render(<Header />)

      screen.getByText(fakeName)

      const signInBtn = screen.queryByRole('button', { name: 'Sign In' })
      expect(signInBtn).toBeNull()
    })
  })
})
