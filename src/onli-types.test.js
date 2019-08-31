import onliTypes from "./onli-types"

const increment = () => {}
const decrement = () => {}
const reset = () => {}
const actions = { increment, decrement, reset }
const types = onliTypes(actions)

test("onliTypes will return an array of types", () => {
  expect(types).toEqual(["increment", "decrement", "reset"])
})
