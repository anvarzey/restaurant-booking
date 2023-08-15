import { act, renderHook } from '@testing-library/react'
import useSignIn from '~/hooks/useSignIn'
import {
  fakeEmail,
  fakeErrorMessage,
  fakePassword,
  fakeURL
} from '../utils/fakeData'
import * as nextAuthReact from 'next-auth/react'

const mockNextAuthReact = nextAuthReact as jest.Mocked<typeof nextAuthReact>

jest.mock('next-auth/react')

describe('Successful sign in ', () => {
  it('should return error as null and loading as false by default', async () => {
    const { result } = renderHook(() => useSignIn())
    const { error, isLoading } = result.current

    expect(error).toBeNull()
    expect(isLoading).toBeFalsy()
  })

  it('should return url to redirect', async () => {
    mockNextAuthReact.signIn.mockImplementation(async () => await Promise.resolve(
      {
        error: undefined,
        status: 200,
        ok: true,
        url: fakeURL
      }
    ))

    const { result } = renderHook(() => useSignIn())
    const { handleSignIn } = result.current

    const res = await act(async () => (
      await handleSignIn({ email: fakeEmail, password: fakePassword })
    ))

    expect(res).toEqual(fakeURL)
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBeFalsy()
  })
})

describe('Error sign in', () => {
  it('should return error message', async () => {
    mockNextAuthReact.signIn.mockImplementation(async () => await Promise.resolve({
      error: fakeErrorMessage,
      status: 200,
      ok: true,
      url: null
    }))

    const { result } = renderHook(() => useSignIn())
    const { handleSignIn } = result.current

    const res = await act(async () => (
      await handleSignIn({ email: fakeEmail, password: fakePassword })
    ))

    expect(result.current.error).toEqual(fakeErrorMessage)
    expect(res).toBeNull()
    expect(result.current.isLoading).toBeFalsy()
  })
})
