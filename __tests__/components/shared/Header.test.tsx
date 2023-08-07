import Header from '~/components/shared/Header'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

let fakeData: string | { user: { name: string } } = ''
let fakeStatus = ''

jest.mock('next-auth/react', () => {
  const fakeSignIn = jest.fn()
  const fakeSignOut = jest.fn()
  const fakeUseSession = jest.fn().mockImplementation(() => ({
    data: fakeData,
    status: fakeStatus
  }))

  return { signIn: fakeSignIn, signOut: fakeSignOut, useSession: fakeUseSession }
})

describe('Header', () => {
  it('should render', async () => {
    await render(<Header />)
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toBeInTheDocument()
  })
  describe('Unauthenticated user', () => {
    it('should render Sign In button when not signed in', async () => {
      await render(<Header />)
      const signInBtn = screen.getByRole('button', { name: 'Sign In' })
      expect(signInBtn).toBeInTheDocument()
    })
  })
  describe('Authenticated user', () => {
    const fakeName = 'FakeName'
    beforeAll(() => {
      fakeData = {
        user: {
          name: fakeName
        }
      }
      fakeStatus = 'authenticated'
    })
    it('should render user\'s name instead of sign in button', async () => {
      await render(<Header />)
      const usersName = screen.getByText(fakeName)
      const signInBtn = screen.queryByRole('button', { name: 'Sign In' })

      expect(usersName).toBeInTheDocument()
      expect(signInBtn).toBeNull()
    })
  })
})
