import onli from "./index"

const increment = (state, { step }) => ({ ...state, count: state.count + step })
const decrement = () => {}
const reset = () => {}

const actions = { increment, decrement, reset }

const [reducer, types] = onli(actions)

test("onli will return a reducer", () => {
  const state = { count: 3 }
  const action = { type: "increment", step: 10 }

  expect(reducer(state, action)).toEqual({ count: 13 })
})

test("onli will return an array of types", () => {
  expect(types).toEqual(["increment", "decrement", "reset"])
})
