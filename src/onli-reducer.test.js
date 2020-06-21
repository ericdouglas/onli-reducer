import onliReducer from './onli-reducer'

const increment = (state, { step }) => ({ count: state.count + step })
const actions = { increment }

test('onliReducer returns the correct method', () => {
  const testReducer = onliReducer(actions)

  const state = { count: 3 }
  const action = { type: 'increment', step: 10 }

  expect(testReducer(state, action)).toEqual({ count: 13 })
})

test('onliReducer returns the current state if an unhandled type is passed', () => {
  const testReducer = onliReducer(actions)

  const state = { count: 3 }
  const action = { type: 'incorrect', something: 'wrong' }

  expect(testReducer(state, action)).toEqual({ count: 3 })
})
