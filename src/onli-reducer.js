const reducer = actions => (state, action) =>
  actions[action.type] ? actions[action.type](state, action) : state

export default reducer
