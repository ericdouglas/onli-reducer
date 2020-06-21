import onliSend from './onli-send'

const dispatch = action => action
const types = ['increment', 'decrement']
const send = onliSend(dispatch, types)

test('send is an object and have methods attached to it', () => {
  expect(typeof send).toBe('object')
  expect(Object.keys(send)).toEqual(types)
})

test("send will contain the methods created using types' name", () => {
  const { increment, decrement } = send

  expect(typeof increment).toBe('function')
  expect(typeof decrement).toBe('function')
})

test('onliSend will populate methods with `type`, `send` and other properties', () => {
  const { increment, decrement } = send

  expect(increment({ step: 5 })).toEqual({
    type: 'increment',
    send,
    step: 5,
  })

  expect(decrement()).toEqual({ type: 'decrement', send })
})
