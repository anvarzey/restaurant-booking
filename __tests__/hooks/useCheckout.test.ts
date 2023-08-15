import { act, renderHook } from '@testing-library/react'
import useCheckout from '~/hooks/useCheckout'
import { fakeOrderItems, fakeURL } from '../utils/fakeData'

describe('Successful checkout', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => await Promise.resolve({
      json: async () => await Promise.resolve({
        url: fakeURL
      })
    })) as jest.Mock
  })

  it('should return error as null and loading as false by default', async () => {
    const { result } = renderHook(() => useCheckout())

    const { error, isLoading } = result.current

    expect(error).toBeNull()
    expect(isLoading).toBeFalsy()
  })

  it('should return url to redirect to', async () => {
    const { result } = renderHook(() => useCheckout())

    const { handleCheckout } = result.current

    const res = await act(async () => {
      return await handleCheckout(fakeOrderItems)
    })

    expect(res).toEqual(fakeURL)
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBeFalsy()
  })
})

describe('Error on checking out', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => await Promise.reject(new Error('Internal Server Error'))) as jest.Mock
  })

  it('should set error with error message', async () => {
    const { result } = renderHook(() => useCheckout())

    const { handleCheckout } = result.current

    const res = await act(async () => {
      return await handleCheckout(fakeOrderItems)
    })

    expect(res).toBeNull()
    expect(result.current.error).toEqual('An error has been occurred')
    expect(result.current.isLoading).toBeFalsy()
  })

  it('should set error back to null when resetError is called', async () => {
    const { result } = renderHook(() => useCheckout())

    const { handleCheckout, resetError } = result.current

    const res = await act(async () => {
      return await handleCheckout(fakeOrderItems)
    })

    const errorAfterHandler = result.current.error

    act(() => {
      return resetError()
    })

    expect(errorAfterHandler).toEqual('An error has been occurred')
    expect(result.current.error).toBeNull()
    expect(res).toBeNull()
    expect(result.current.isLoading).toBeFalsy()
  })
})
