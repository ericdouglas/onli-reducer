/**
 * Helper function that generate the object that will hold all the actions populated
 * with its correct types to be dispatched without necessity to pass the type manually
 *
 * @param {() => void} dispatch
 * @param {Object} types
 * @returns {Object} object with all actions populated with types to be dispatched
 */
const onliSend = (dispatch, types) => {
  const send = types.reduce((acc, next) => ({ ...acc, [next]: '' }), {})
  const newDispatch = type => action => dispatch({ type, send, ...action })

  types.forEach(type => {
    send[type] = newDispatch(type)
  })

  return send
}

export default onliSend
