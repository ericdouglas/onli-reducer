import onliReducer from "./onli-reducer"

const increment = (state, { step }) => ({ count: state.count + step })
const actions = { increment }

test("if onliReducer will return the correct method", () => {
  const testReducer = onliReducer(actions)

  const state = { count: 3 }
  const action = { type: "increment", step: 10 }

  expect(testReducer(state, action)).toEqual({ count: 13 })
})
