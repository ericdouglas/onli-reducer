/**
 * Function that generates the reducer based on the actions object passed
 *
 * @param {Object} actions
 * @returns {() => void} reducer function
 */
const onliReducer = actions => (state, action) =>
  actions[action.type] ? actions[action.type](state, action) : state

export default onliReducer
