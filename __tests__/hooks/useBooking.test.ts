import { act, renderHook } from '@testing-library/react'
import useBooking from '~/hooks/useBooking'

describe('Successful response', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => await Promise.resolve({
      json: async () => await Promise.resolve({
        message: 'OK'
      })
    })) as jest.Mock
  })

  it('should return OK when booking is succesfull', async () => {
    const { result } = renderHook(() => useBooking())
    const { error, isLoading } = result.current

    expect(error).toBeNull()
    expect(isLoading).toBeFalsy()
  })

  it('should return OK when booking is succesfull', async () => {
    const { result } = renderHook(() => useBooking())
    const { handleBooking } = result.current

    const date = '2023/07/05'
    const numberOfPeople = 3
    const time = '20:30'
    const userId = 'fakeuserid'

    const res =
  await act(async () => (
    await handleBooking({ date, numberOfPeople, time, userId })
  ))

    expect(res).toEqual('OK')
  })
})

describe('Error response', () => {
  const fakeError = 'Fake Error'
  beforeEach(() => {
    global.fetch = jest.fn(async () => (
      await Promise.resolve({
        json: async () => await Promise.resolve({
          error: fakeError
        })
      })
    )) as jest.Mock
  })

  it('should return error', async () => {
    const { result } = renderHook(() => useBooking())
    const { handleBooking } = result.current

    const date = '2023/07/05'
    const numberOfPeople = 3
    const time = '20:30'
    const userId = 'fakeuserid'

    const res =
  await act(async () => (
    await handleBooking({ date, numberOfPeople, time, userId })
  ))

    expect(res).toBeNull()
    expect(result.current.error).toEqual(fakeError)
  })
})

describe('Date or Time is missing', () => {
  const mockedFetch = jest.fn()
  const dateTimeError = 'Date or Time is missing or has wrong format'
  beforeEach(() => {
    global.fetch = mockedFetch
  })

  it('should return DateTime error', async () => {
    const { result } = renderHook(() => useBooking())
    const { handleBooking } = result.current

    const date = '2023/5/2'
    const numberOfPeople = 3
    const time = '20:30'
    const userId = 'fakeuserid'

    await act(async () => (
      await handleBooking({ date, numberOfPeople, time, userId })
    ))

    expect(mockedFetch).not.toBeCalled()
    expect(result.current.error).toEqual(dateTimeError)
  })
})
