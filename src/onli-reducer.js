export default actions => (state, action) => actions[action.type](state, action)
